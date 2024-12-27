import { createServerClient } from '@supabase/ssr';

export async function GET(req) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase.from('auth.users').select('*');

  if (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}