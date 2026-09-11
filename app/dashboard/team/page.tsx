import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUserProfile } from '@/lib/auth/session';
import InviteAdminForm from './InviteAdminForm';

/**
 * Team management — Super Admin only.
 * Lists business members and provides the invite form.
 */
export default async function TeamPage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect('/login');
  }

  if (!profile?.isSuperAdmin || !profile?.businessProfileId) {
    redirect('/dashboard');
  }

  const supabase = await createClient();

  // Team members: profiles linked to this business (RLS also enforces this)
  const { data: members, error: membersError } = await supabase
    .from('users')
    .select('id, full_name, is_active, roles(name)')
    .eq('business_profile_id', profile.businessProfileId)
    .order('created_at', { ascending: true });

  // Available roles for the invite dropdown (open read policy from 001)
  const { data: roles, error: rolesError } = await supabase
    .from('roles')
    .select('id, name')
    .order('name');

  const memberList = (members ?? []).map((m) => {
    const r = Array.isArray(m.roles) ? m.roles[0]?.name : m.roles?.name;
    return { ...m, roleName: r ?? '—' };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Team</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Invite form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Invite a Team Member
            </h2>
            <InviteAdminForm roles={roles ?? []} />
          </div>
        </div>

        {/* Members table */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {(membersError ?? !members) || memberList.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                      No team members yet.
                    </td>
                  </tr>
                ) : (
                  memberList.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {member.full_name ?? '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {member.roleName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            member.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {member.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
