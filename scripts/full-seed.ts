
import { createClient } from '@supabase/supabase-js';


import fs from 'fs';
import path from 'path';

// Force load env.json
const envPath = path.resolve(process.cwd(), 'env.json');
console.log('Loading env from:', envPath);
const config = JSON.parse(fs.readFileSync(envPath, 'utf-8'));

const supabaseUrl = config.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = config.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL:', supabaseUrl ? 'Found' : 'Missing');
console.log('Service Key:', serviceRoleKey ? 'Found' : 'Missing');

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing env vars. Please check env.json');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);


// --- FULL MOCK DATA ---
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
        publications: 15,
        availability: "occupied",
        preferredRegions: ["東京", "神奈川"],
        skills: ["ハイリスク妊娠管理", "帝王切開", "胎児超音波診断"],
        bio: "周産期医療を専門とし、ハイリスク妊娠の管理に豊富な経験を持つ。地域医療連携にも積極的に取り組む。",
        languages: ["日本語", "英語"],
        specialInterests: ["胎児診断", "多胎妊娠管理", "周産期メンタルヘルス"],
        careerHistory: [
            {
                period: "2015年4月 - 現在",
                facility: "東京大学医学部附属病院",
                position: "産婦人科 講師",
                description: "周産期部門の責任者として、ハイリスク妊娠の管理を担当",
            },
            {
                period: "2012年4月 - 2015年3月",
                facility: "横浜市立大学附属病院",
                position: "産婦人科 助教",
                description: "周産期医療の臨床と研究に従事",
            },
            {
                period: "2010年4月 - 2012年3月",
                facility: "神奈川県立こども医療センター",
                position: "周産期科 医員",
                description: "NICU・MFICUでの研修",
            },
        ],
        educationHistory: [
            {
                period: "2008年 - 2015年",
                institution: "東京大学大学院医学系研究科",
                degree: "博士（医学）",
                field: "周産期医学",
            },
            {
                period: "2002年 - 2008年",
                institution: "東京大学医学部",
                degree: "医学士",
            },
        ],
        certificationDetails: [
            {
                name: "周産期専門医",
                issueDate: "2018年4月",
                number: "P-2018-1234",
            },
            {
                name: "産婦人科専門医",
                issueDate: "2015年4月",
                number: "OB-2015-5678",
            },
            {
                name: "超音波専門医",
                issueDate: "2016年10月",
                number: "US-2016-9012",
            },
        ],
        researchList: [
            {
                year: "2024年",
                title: "双胎妊娠における選択的胎児発育不全の予後予測因子に関する研究",
                journal: "日本産科婦人科学会雑誌",
                authors: ["山田太郎", "佐藤花子", "他"],
                type: "論文",
            },
            {
                year: "2024年",
                title: "ハイリスク妊娠管理における遠隔モニタリングの有効性",
                journal: "第76回日本産科婦人科学会学術講演会",
                type: "学会発表",
            },
            {
                year: "2023年",
                title: "周産期医療の最前線：ハイリスク妊娠管理の実際",
                journal: "メディカル出版",
                type: "著書",
            },
        ],
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
        certifications: ["産婦人科専門医", "生殖医療専門医"],
        publications: 8,
        availability: "available",
        preferredRegions: ["東京", "埼玉", "千葉"],
        skills: ["体外受精", "顕微授精", "不妊カウンセリング"],
        bio: "生殖医療を専門とし、体外受精・顕微授精の実績が豊富。患者さんに寄り添った診療を心がけている。",
        languages: ["日本語", "英語"],
        specialInterests: ["生殖内分泌学", "着床前診断", "不妊カウンセリング"],
        careerHistory: [
            {
                period: "2020年4月 - 現在",
                facility: "東京不妊クリニック",
                position: "生殖医療科 部長",
                description: "体外受精・顕微授精を中心とした生殖医療の臨床",
            },
            {
                period: "2018年4月 - 2020年3月",
                facility: "慶應義塾大学病院",
                position: "産婦人科 助教",
                description: "生殖医療部門での研修と研究",
            },
        ],
        educationHistory: [
            {
                period: "2014年 - 2018年",
                institution: "慶應義塾大学大学院医学研究科",
                degree: "博士（医学）",
                field: "生殖医学",
            },
            {
                period: "2008年 - 2014年",
                institution: "慶應義塾大学医学部",
                degree: "医学士",
            },
        ],
        certificationDetails: [
            {
                name: "生殖医療専門医",
                issueDate: "2020年4月",
                number: "RM-2020-3456",
            },
            {
                name: "産婦人科専門医",
                issueDate: "2018年4月",
                number: "OB-2018-7890",
            },
        ],
        researchList: [
            {
                year: "2024年",
                title: "タイムラプスインキュベーターを用いた胚評価の有用性",
                journal: "日本受精着床学会雑誌",
                type: "論文",
            },
            {
                year: "2023年",
                title: "着床前遺伝学的検査(PGT-A)の臨床成績",
                journal: "第41回日本受精着床学会総会",
                type: "学会発表",
            },
        ],
    },
    {
        id: "3",
        email: "tanaka@medical.jp",
        name: "田中健一",
        role: "doctor",
        department: "産婦人科",
        specialty: "腫瘍学",
        licenseNumber: "MD-2016-023",
        joinedDate: "2016-04-01",
        experience: 8,
        certifications: ["産婦人科専門医", "婦人科腫瘍専門医", "がん治療認定医"],
        publications: 12,
        availability: "occupied",
        skills: ["婦人科がん手術", "化学療法", "緩和ケア"],
        languages: ["日本語", "英語", "ドイツ語"],
        specialInterests: ["卵巣がん", "子宮頸がん", "妊孕性温存治療"],
        bio: "婦人科がん治療の専門家。",
        careerHistory: [], educationHistory: [], researchList: [], certificationDetails: []
    },
    {
        id: "4", email: "suzuki@medical.jp", name: "鈴木美咲", role: "resident", department: "産婦人科", specialty: "一般産婦人科",
        licenseNumber: "MD-2022-089", joinedDate: "2022-04-01", experience: 2, availability: "available", bio: "研修医",
        careerHistory: [], educationHistory: [], researchList: [], certificationDetails: []
    }
];

const MOCK_JOB_POSTINGS = [
    {
        id: "1",
        title: "産婦人科常勤医師募集",
        facility: "横浜総合病院",
        location: "神奈川県横浜市",
        region: "神奈川",
        type: "full-time",
        salary: "年収1200万円〜1800万円",
        description: "地域周産期母子医療センターでの産婦人科医師を募集しています。",
        requirements: ["産婦人科専門医", "3年以上の実務経験"],
        benefits: ["社会保険完備", "学会参加支援", "住宅手当", "当直手当"],
        postedDate: "2025-01-05",
        deadline: "2025-02-28",
        status: "open",
        applicants: 3,
    },
    {
        id: "2",
        title: "生殖医療専門医募集",
        facility: "東京不妊クリニック",
        location: "東京都渋谷区",
        region: "東京",
        type: "full-time",
        salary: "年収1500万円〜2000万円",
        description: "高度生殖医療を提供するクリニックでの専門医募集。",
        requirements: ["生殖医療専門医", "体外受精の経験"],
        benefits: ["社会保険完備", "研究支援"],
        postedDate: "2025-01-08",
        deadline: "2025-03-31",
        status: "open",
        applicants: 2,
    },
];

const MOCK_CASES = [
    {
        id: "1",
        title: "双胎妊娠における胎児発育不全の管理",
        category: "周産期",
        authorId: "1", // Mapped from authorId "1"
        date: "2025-01-05",
        summary: "双胎妊娠における一児の胎児発育不全に対する管理。",
        diagnosis: "双胎妊娠、一児胎児発育不全（FGR）",
        treatment: "厳重なモニタリング",
        outcome: "妊娠35週で選択的帝王切開。",
        views: 234,
        tags: ["双胎妊娠", "胎児発育不全"],
    }
];

async function seed() {
    console.log('Starting seed...');

    // 1. Doctors (Users + Profiles)
    const idMap: Record<string, string> = {};

    for (const doc of MOCK_DOCTORS) {
        console.log(`Processing user ${doc.email}...`);
        let userId;

        const { data: userData, error: userError } = await supabase.auth.admin.listUsers();

        // Check error for listUsers (requires admin key)
        if (userError) {
            console.error("Error listing users. Is Service Role Key valid?", userError.message);
            // Continue but probably will fail
        }

        const existingUser = userData?.users.find(u => u.email === doc.email);

        if (existingUser) {
            userId = existingUser.id;
            console.log(`User ${doc.email} exists: ${userId}`);
        } else {
            const { data, error } = await supabase.auth.admin.createUser({
                email: doc.email,
                password: 'password123',
                email_confirm: true,
                user_metadata: { name: doc.name }
            });
            if (error) {
                console.error(`Error creating user ${doc.email}:`, error.message);
                continue;
            }
            userId = data.user.id;
            console.log(`Created user ${doc.email}: ${userId}`);
        }
        idMap[doc.id] = userId;

        // Upsert Profile
        const { error: profileError } = await supabase.from('profiles').upsert({
            id: userId,
            email: doc.email,
            name: doc.name,
            role: doc.role,
            department: doc.department,
            specialty: doc.specialty,
            license_number: doc.licenseNumber,
            joined_date: doc.joinedDate || null,
            experience: doc.experience || 0,
            availability: doc.availability,
            bio: doc.bio,
            updated_at: new Date().toISOString()
        });
        if (profileError) console.error('Error seeding profile:', profileError);

        // Career
        if (doc.careerHistory) {
            await supabase.from('career_history').delete().eq('profile_id', userId);
            for (const h of doc.careerHistory) {
                await supabase.from('career_history').insert({
                    profile_id: userId,
                    period: h.period,
                    facility: h.facility,
                    position: h.position,
                    description: h.description
                });
            }
        }
    }

    // 2. Jobs
    console.log('Seeding jobs...');
    for (const job of MOCK_JOB_POSTINGS) {
        const { error } = await supabase.from('job_postings').insert({
            title: job.title,
            facility: job.facility,
            location: job.location,
            region: job.region,
            type: job.type,
            salary: job.salary,
            description: job.description,
            posted_date: job.postedDate,
            deadline: job.deadline,
            status: job.status,
            applicants_count: job.applicants
        });
        if (error) console.error("Job Error", error.message);
    }

    // 3. Cases
    console.log('Seeding cases...');
    for (const c of MOCK_CASES) {
        const authorUuid = idMap[c.authorId];
        if (!authorUuid) {
            console.log(`Skipping case ${c.title} because author ${c.authorId} not found mapped.`);
            continue;
        }
        const { error } = await supabase.from('case_studies').insert({
            title: c.title,
            category: c.category,
            author_id: authorUuid,
            date: c.date,
            summary: c.summary,
            diagnosis: c.diagnosis,
            treatment: c.treatment,
            outcome: c.outcome,
            views: c.views
        });
        if (error) console.error("Case Error", error.message);
    }

    console.log('Seed complete!');
}

seed();
