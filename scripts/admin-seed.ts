
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// --- DATA (Simplified subset for demonstration, user should expand) ---
// Ideally this imports MOCK_DOCTORS but we avoid import issues by defining here or reading JSON.
// For this task, I will define the data wrapper here or use the file reading trick if I could.
// I'll put the data inline for reliability.

const MOCK_DOCTORS = [
    {
        id: "1",
        email: "admin@medical.jp",
        name: "山田太郎",
        role: "admin",
        department: "産婦人科",
        specialty: "周産期医療",
        licenseNumber: "MD-2015-001",
        joinedDate: "2015-04-01",
        experience: 9,
        certifications: ["周産期専門医", "産婦人科専門医", "超音波専門医"],
        availability: "occupied",
        bio: "周産期医療を専門とし、ハイリスク妊娠の管理に豊富な経験を持つ。",
    },
    {
        id: "2",
        email: "doctor@medical.jp",
        name: "佐藤花子",
        role: "doctor",
        department: "産婦人科",
        specialty: "生殖医療",
        licenseNumber: "MD-2018-042",
        joinedDate: "2018-04-01",
        experience: 6,
        certifications: ["(略)"],
        availability: "available",
        bio: "生殖医療を専門とし、(略)",
    },
    // ... Ideally more
];

// We can add more data here...

async function seed() {
    console.log('Seeding...');

    // 1. Doctors (Users + Profiles)
    for (const doc of MOCK_DOCTORS) {
        // Check if user exists
        let userId;
        const { data: users } = await supabase.auth.admin.listUsers();
        const existingUser = users?.users?.find(u => u.email === doc.email);

        if (existingUser) {
            console.log(`User ${doc.email} exists.`);
            userId = existingUser.id;
        } else {
            console.log(`Creating user ${doc.email}...`);
            const { data, error } = await supabase.auth.admin.createUser({
                email: doc.email,
                password: 'password123', // Default password
                email_confirm: true
            });
            if (error) {
                console.error('Error creating user:', error);
                continue;
            }
            userId = data.user.id;
        }

        // Upsert Profile
        // Note: TRIGGER might already create profile on user creation if set up, 
        // but our schema creates table but maybe not the trigger to auto-insert from auth?
        // We didn't add a trigger to schema.sql to auto-create profile on auth.user insert.
        // So we assume we must insert it.

        // We need to map field names from mock (camelCase) to DB (snake_case)
        const { error: profileError } = await supabase.from('profiles').upsert({
            id: userId,
            email: doc.email,
            name: doc.name,
            role: doc.role,
            department: doc.department,
            specialty: doc.specialty,
            license_number: doc.licenseNumber,
            joined_date: doc.joinedDate,
            experience: doc.experience,
            availability: doc.availability,
            bio: doc.bio,
            // ... other fields
        });

        if (profileError) console.error('Error seeding profile:', profileError);
    }

    // 2. Job Postings
    // ...

    console.log('Seeding complete.');
}

seed();
