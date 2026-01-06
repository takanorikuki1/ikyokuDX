
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local from the project root
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key if available for admin access, otherwise anon key is fine for public read
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Missing Supabase environment variables.');
    console.error('Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or ANON_KEY) are in .env.local');
    process.exit(1);
}

console.log(`Connecting to Supabase at: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const { count, error } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Database connection failed!');
            console.error('Error details:', error.message);
            process.exit(1);
        }

        console.log('✅ Database connection successful!');
        console.log(`Found ${count} records in 'profiles' table.`);

    } catch (err) {
        console.error('❌ Unexpected error during connection test:', err);
        process.exit(1);
    }
}

testConnection();
