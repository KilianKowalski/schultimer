import { createClient } from '@supabase/supabase-js';

export async function handler(event, context) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  const { data: row } = await supabase
    .from('counter')
    .select('views')
    .eq('id', 1)
    .single();

  const { data } = await supabase
    .from('counter')
    .update({ views: row.views + 1 })
    .eq('id', 1)
    .select()
    .single();

  return {
    statusCode: 200,
    body: JSON.stringify({ views: data.views })
  };
}
