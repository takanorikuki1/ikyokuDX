import type { User } from "@/lib/mock-auth"

export interface CareerHistory {
  period: string
  facility: string
  position: string
  description?: string
}

export interface Education {
  period: string
  institution: string
  degree: string
  field?: string
}

export interface Research {
  year: string
  title: string
  journal?: string
  authors?: string[]
  type: "論文" | "学会発表" | "著書"
}

export interface Certification {
  name: string
  issueDate: string
  number?: string
}

export interface DoctorProfile extends User {
  department: string
  specialty: string
  licenseNumber: string
  joinedDate: string
  experience: number
  certifications: string[]
  publications?: number
  availability: "available" | "occupied" | "unavailable"
  preferredRegions?: string[]
  skills: string[]
  bio?: string
  careerHistory?: CareerHistory[]
  educationHistory?: Education[]
  researchList?: Research[]
  certificationDetails?: Certification[]
  languages?: string[]
  specialInterests?: string[]
}

export interface JobPosting {
  id: string
  title: string
  facility: string
  location: string
  region: string
  type: "full-time" | "part-time" | "temporary"
  salary?: string
  description: string
  requirements: string[]
  benefits: string[]
  postedDate: string
  deadline: string
  status: "open" | "closed"
  applicants: number
}

export interface CaseStudy {
  id: string
  title: string
  category: string
  author: string
  authorId: string
  date: string
  summary: string
  diagnosis: string
  treatment: string
  outcome: string
  images?: string[]
  tags: string[]
  views: number
  comments: number
}

export interface EducationContent {
  id: string
  title: string
  type: "video" | "document" | "webinar" | "course"
  category: string
  instructor: string
  duration?: string
  level: "beginner" | "intermediate" | "advanced"
  description: string
  thumbnail?: string
  views: number
  rating: number
  publishedDate: string
  tags: string[]
}

export interface Notification {
  id: string
  type: "info" | "warning" | "success" | "error"
  title: string
  message: string
  date: string
  read: boolean
  link?: string
}

export interface BoardPost {
  id: string
  title: string
  content: string
  author: string
  authorId: string
  category: "general" | "qa" | "announcement" | "event"
  date: string
  replies: number
  views: number
  tags: string[]
  isPinned?: boolean
}

export interface SponsorAd {
  id: string
  company: string
  logo: string
  title: string
  description: string
  link?: string
  type: "banner" | "card"
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  read: boolean
  attachments?: string[]
}

export interface Conversation {
  id: string
  type: "direct" | "group"
  name?: string
  participants: string[]
  participantNames: string[]
  lastMessage?: Message
  unreadCount: number
  avatar?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface GroupChat extends Conversation {
  description?: string
  adminId: string
  memberCount: number
}

export interface DonationProject {
  id: string
  title: string
  description: string
  detailedDescription: string
  goal: number
  current: number
  supporters: number
  category: string
  startDate: string
  endDate: string
  image?: string
  updates: {
    date: string
    title: string
    content: string
  }[]
  benefits: string[]
}

export interface Donation {
  id: string
  name: string
  amount: number
  date: string
  message?: string
  projectId: string
}

export const MOCK_DOCTORS: DoctorProfile[] = [
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
    careerHistory: [
      {
        period: "2019年4月 - 現在",
        facility: "国立がん研究センター中央病院",
        position: "婦人科腫瘍科 医長",
        description: "婦人科がんの手術・化学療法を担当",
      },
      {
        period: "2016年4月 - 2019年3月",
        facility: "東京医科歯科大学医学部附属病院",
        position: "産婦人科 助教",
        description: "婦人科腫瘍の臨床と研究",
      },
    ],
    educationHistory: [
      {
        period: "2013年 - 2016年",
        institution: "東京医科歯科大学大学院医歯学総合研究科",
        degree: "博士（医学）",
        field: "婦人科腫瘍学",
      },
      {
        period: "2007年 - 2013年",
        institution: "東京医科歯科大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "婦人科腫瘍専門医",
        issueDate: "2019年4月",
        number: "GT-2019-2345",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2016年4月",
        number: "OB-2016-6789",
      },
      {
        name: "がん治療認定医",
        issueDate: "2017年10月",
        number: "CT-2017-8901",
      },
    ],
    researchList: [
      {
        year: "2024年",
        title: "若年子宮頸がんにおける妊孕性温存治療の長期成績",
        journal: "International Journal of Gynecologic Cancer",
        type: "論文",
      },
      {
        year: "2023年",
        title: "進行卵巣がんに対する新規分子標的薬の治療効果",
        journal: "第65回日本婦人科腫瘍学会学術講演会",
        type: "学会発表",
      },
    ],
  },
  {
    id: "4",
    email: "suzuki@medical.jp",
    name: "鈴木美咲",
    role: "resident",
    department: "産婦人科",
    specialty: "一般産婦人科",
    licenseNumber: "MD-2022-089",
    joinedDate: "2022-04-01",
    experience: 2,
    certifications: ["医師免許"],
    availability: "available",
    preferredRegions: ["東京", "神奈川", "千葉", "埼玉"],
    skills: ["正常分娩", "一般婦人科診療"],
    bio: "産婦人科専門医を目指して研修中。幅広い経験を積みたいと考えている。",
    languages: ["日本語", "英語"],
    specialInterests: ["周産期医療", "女性ヘルスケア"],
    careerHistory: [
      {
        period: "2022年4月 - 現在",
        facility: "東京都立病院",
        position: "産婦人科 専攻医",
        description: "産婦人科全般の研修中",
      },
    ],
    educationHistory: [
      {
        period: "2016年 - 2022年",
        institution: "東京医科大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "医師免許",
        issueDate: "2022年4月",
        number: "MD-2022-089",
      },
    ],
    researchList: [],
  },
  {
    id: "5",
    email: "watanabe@medical.jp",
    name: "渡辺誠",
    role: "doctor",
    department: "産婦人科",
    specialty: "周産期医療",
    licenseNumber: "MD-2017-034",
    joinedDate: "2017-04-01",
    experience: 7,
    certifications: ["産婦人科専門医", "周産期専門医"],
    publications: 10,
    availability: "available",
    preferredRegions: ["大阪", "京都", "兵庫"],
    skills: ["帝王切開", "周産期管理", "胎児超音波"],
    bio: "関西地域で周産期医療に従事。地域の産科救急体制の構築に貢献。",
    languages: ["日本語"],
    specialInterests: ["産科救急", "周産期管理"],
    careerHistory: [
      {
        period: "2017年4月 - 現在",
        facility: "大阪市立大学医学部附属病院",
        position: "産婦人科 助教",
        description: "周産期医療の臨床と教育",
      },
    ],
    educationHistory: [
      {
        period: "2011年 - 2017年",
        institution: "大阪市立大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "周産期専門医",
        issueDate: "2020年4月",
        number: "P-2020-5678",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2017年4月",
        number: "OB-2017-1234",
      },
    ],
    researchList: [
      {
        year: "2024年",
        title: "産科救急における地域連携体制の構築",
        journal: "日本周産期・新生児医学会雑誌",
        type: "論文",
      },
    ],
  },
  {
    id: "6",
    email: "kobayashi@medical.jp",
    name: "小林愛",
    role: "doctor",
    department: "産婦人科",
    specialty: "生殖医療",
    licenseNumber: "MD-2019-056",
    joinedDate: "2019-04-01",
    experience: 5,
    certifications: ["産婦人科専門医"],
    publications: 5,
    availability: "available",
    preferredRegions: ["福岡", "熊本"],
    skills: ["人工授精", "タイミング指導", "不妊カウンセリング"],
    bio: "九州地域での不妊治療に携わる。患者さんの心のケアを大切にしている。",
    languages: ["日本語"],
    specialInterests: ["不妊カウンセリング", "男性不妊"],
    careerHistory: [
      {
        period: "2019年4月 - 現在",
        facility: "福岡レディースクリニック",
        position: "不妊治療科 医師",
        description: "一般不妊治療を中心に診療",
      },
    ],
    educationHistory: [
      {
        period: "2013年 - 2019年",
        institution: "九州大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "産婦人科専門医",
        issueDate: "2019年4月",
        number: "OB-2019-3456",
      },
    ],
    researchList: [],
  },
  {
    id: "7",
    email: "yamamoto@medical.jp",
    name: "山本隆志",
    role: "doctor",
    department: "産婦人科",
    specialty: "腫瘍学",
    licenseNumber: "MD-2014-012",
    joinedDate: "2014-04-01",
    experience: 10,
    certifications: ["産婦人科専門医", "婦人科腫瘍専門医"],
    publications: 18,
    availability: "occupied",
    preferredRegions: ["愛知", "岐阜", "三重"],
    skills: ["腹腔鏡手術", "ロボット手術", "がん薬物療法"],
    bio: "婦人科がんの低侵襲手術を専門とし、多数の手術実績を持つ。",
    languages: ["日本語", "英語"],
    specialInterests: ["低侵襲手術", "ロボット支援手術"],
    careerHistory: [
      {
        period: "2018年4月 - 現在",
        facility: "名古屋大学医学部附属病院",
        position: "婦人科腫瘍科 講師",
        description: "婦人科がんの手術・化学療法",
      },
      {
        period: "2014年4月 - 2018年3月",
        facility: "愛知県がんセンター",
        position: "婦人科 医員",
        description: "婦人科がん治療の研修",
      },
    ],
    educationHistory: [
      {
        period: "2008年 - 2014年",
        institution: "名古屋大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "婦人科腫瘍専門医",
        issueDate: "2018年4月",
        number: "GT-2018-7890",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2014年4月",
        number: "OB-2014-4567",
      },
    ],
    researchList: [
      {
        year: "2024年",
        title: "ロボット支援下子宮体がん手術の治療成績",
        journal: "Gynecologic Oncology",
        type: "論文",
      },
    ],
  },
  {
    id: "8",
    email: "nakamura@medical.jp",
    name: "中村優子",
    role: "doctor",
    department: "産婦人科",
    specialty: "女性ヘルスケア",
    licenseNumber: "MD-2020-078",
    joinedDate: "2020-04-01",
    experience: 4,
    certifications: ["産婦人科専門医"],
    availability: "available",
    preferredRegions: ["北海道"],
    skills: ["更年期管理", "骨盤底障害", "女性ヘルスケア"],
    bio: "女性のライフステージに寄り添った医療を提供。更年期医療に力を入れている。",
    languages: ["日本語"],
    specialInterests: ["更年期医療", "女性アスリート"],
    careerHistory: [
      {
        period: "2020年4月 - 現在",
        facility: "札幌医科大学附属病院",
        position: "産婦人科 助教",
        description: "女性ヘルスケア外来担当",
      },
    ],
    educationHistory: [
      {
        period: "2014年 - 2020年",
        institution: "札幌医科大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "産婦人科専門医",
        issueDate: "2020年4月",
        number: "OB-2020-8901",
      },
    ],
    researchList: [],
  },
  {
    id: "9",
    email: "ito@medical.jp",
    name: "伊藤大輔",
    role: "doctor",
    department: "産婦人科",
    specialty: "周産期医療",
    licenseNumber: "MD-2015-045",
    joinedDate: "2015-04-01",
    experience: 9,
    certifications: ["産婦人科専門医", "周産期専門医", "新生児蘇生法インストラクター"],
    publications: 14,
    availability: "occupied",
    preferredRegions: ["宮城", "岩手", "福島"],
    skills: ["新生児蘇生", "ハイリスク分娩管理", "胎児治療"],
    bio: "東北地域の周産期医療の中核を担う。新生児蘇生のインストラクターとしても活動。",
    languages: ["日本語", "英語"],
    specialInterests: ["胎児治療", "新生児蘇生"],
    careerHistory: [
      {
        period: "2018年4月 - 現在",
        facility: "東北大学病院",
        position: "産婦人科 講師",
        description: "周産期部門の責任者",
      },
      {
        period: "2015年4月 - 2018年3月",
        facility: "宮城県立こども病院",
        position: "周産期科 医員",
        description: "周産期医療の臨床研修",
      },
    ],
    educationHistory: [
      {
        period: "2009年 - 2015年",
        institution: "東北大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "周産期専門医",
        issueDate: "2018年4月",
        number: "P-2018-2345",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2015年4月",
        number: "OB-2015-6789",
      },
      {
        name: "新生児蘇生法インストラクター",
        issueDate: "2019年10月",
        number: "NRP-2019-0123",
      },
    ],
    researchList: [
      {
        year: "2024年",
        title: "胎児心疾患に対する胎児治療の長期予後",
        journal: "Journal of Maternal-Fetal & Neonatal Medicine",
        type: "論文",
      },
    ],
  },
  {
    id: "10",
    email: "takahashi@medical.jp",
    name: "高橋真理子",
    role: "doctor",
    department: "産婦人科",
    specialty: "生殖医療",
    licenseNumber: "MD-2017-067",
    joinedDate: "2017-04-01",
    experience: 7,
    certifications: ["産婦人科専門医", "生殖医療専門医"],
    publications: 9,
    availability: "available",
    preferredRegions: ["広島", "岡山"],
    skills: ["体外受精", "卵子凍結", "生殖内分泌"],
    bio: "中国地方での生殖医療を牽引。卵子凍結保存の啓発活動にも力を入れている。",
    languages: ["日本語", "英語"],
    specialInterests: ["がん生殖医療", "卵子凍結保存"],
    careerHistory: [
      {
        period: "2019年4月 - 現在",
        facility: "広島大学病院",
        position: "生殖医療科 助教",
        description: "生殖医療の臨床と研究",
      },
      {
        period: "2017年4月 - 2019年3月",
        facility: "岡山大学病院",
        position: "産婦人科 医員",
        description: "生殖医療の研修",
      },
    ],
    educationHistory: [
      {
        period: "2011年 - 2017年",
        institution: "広島大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "生殖医療専門医",
        issueDate: "2021年4月",
        number: "RM-2021-4567",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2017年4月",
        number: "OB-2017-8901",
      },
    ],
    researchList: [
      {
        year: "2024年",
        title: "がん治療前の卵子凍結保存の有用性",
        journal: "日本がん・生殖医療学会誌",
        type: "論文",
      },
    ],
  },
  {
    id: "11",
    email: "matsumoto@medical.jp",
    name: "松本健太",
    role: "resident",
    department: "産婦人科",
    specialty: "一般産婦人科",
    licenseNumber: "MD-2023-101",
    joinedDate: "2023-04-01",
    experience: 1,
    certifications: ["医師免許"],
    availability: "available",
    preferredRegions: ["東京", "神奈川"],
    skills: ["正常分娩", "外来診療"],
    bio: "産婦人科専攻医1年目。積極的に学び、成長したいと考えています。",
    languages: ["日本語"],
    specialInterests: ["周産期医療"],
    careerHistory: [
      {
        period: "2023年4月 - 現在",
        facility: "聖路加国際病院",
        position: "産婦人科 専攻医",
        description: "産婦人科研修中",
      },
    ],
    educationHistory: [
      {
        period: "2017年 - 2023年",
        institution: "聖マリアンナ医科大学",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "医師免許",
        issueDate: "2023年4月",
        number: "MD-2023-101",
      },
    ],
    researchList: [],
  },
  {
    id: "12",
    email: "inoue@medical.jp",
    name: "井上さくら",
    role: "doctor",
    department: "産婦人科",
    specialty: "女性ヘルスケア",
    licenseNumber: "MD-2016-089",
    joinedDate: "2016-04-01",
    experience: 8,
    certifications: ["産婦人科専門医", "女性ヘルスケア専門医"],
    publications: 6,
    availability: "available",
    preferredRegions: ["静岡", "神奈川"],
    skills: ["月経困難症治療", "PMS管理", "低用量ピル処方"],
    bio: "思春期から更年期まで、女性の生涯にわたる健康をサポート。",
    languages: ["日本語"],
    specialInterests: ["月経関連疾患", "思春期医療"],
    careerHistory: [
      {
        period: "2016年4月 - 現在",
        facility: "静岡市立病院",
        position: "産婦人科 医長",
        description: "女性ヘルスケア外来担当",
      },
    ],
    educationHistory: [
      {
        period: "2010年 - 2016年",
        institution: "浜松医科大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "女性ヘルスケア専門医",
        issueDate: "2019年4月",
        number: "WH-2019-2345",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2016年4月",
        number: "OB-2016-3456",
      },
    ],
    researchList: [],
  },
  {
    id: "13",
    email: "kimura@medical.jp",
    name: "木村翔太",
    role: "doctor",
    department: "産婦人科",
    specialty: "腫瘍学",
    licenseNumber: "MD-2013-034",
    joinedDate: "2013-04-01",
    experience: 11,
    certifications: ["産婦人科専門医", "婦人科腫瘍専門医", "がん薬物療法専門医"],
    publications: 22,
    availability: "occupied",
    preferredRegions: ["大阪", "京都"],
    skills: ["婦人科がん手術", "化学療法", "放射線療法"],
    bio: "婦人科がん治療のエキスパート。集学的治療に精通している。",
    languages: ["日本語", "英語"],
    specialInterests: ["子宮体がん", "卵巣がん"],
    careerHistory: [
      {
        period: "2017年4月 - 現在",
        facility: "京都大学医学部附属病院",
        position: "婦人科腫瘍科 准教授",
        description: "婦人科がん治療の責任者",
      },
      {
        period: "2013年4月 - 2017年3月",
        facility: "大阪府立成人病センター",
        position: "婦人科 医員",
        description: "婦人科がん治療の研修",
      },
    ],
    educationHistory: [
      {
        period: "2007年 - 2013年",
        institution: "京都大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "がん薬物療法専門医",
        issueDate: "2019年4月",
        number: "CO-2019-5678",
      },
      {
        name: "婦人科腫瘍専門医",
        issueDate: "2017年4月",
        number: "GT-2017-6789",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2013年4月",
        number: "OB-2013-7890",
      },
    ],
    researchList: [
      {
        year: "2024年",
        title: "子宮体がんに対する免疫チェックポイント阻害薬の治療効果",
        journal: "Lancet Oncology",
        type: "論文",
      },
    ],
  },
  {
    id: "14",
    email: "hayashi@medical.jp",
    name: "林美穂",
    role: "doctor",
    department: "産婦人科",
    specialty: "周産期医療",
    licenseNumber: "MD-2018-091",
    joinedDate: "2018-04-01",
    experience: 6,
    certifications: ["産婦人科専門医", "周産期専門医"],
    publications: 7,
    availability: "available",
    preferredRegions: ["愛知", "三重"],
    skills: ["双胎管理", "胎児超音波", "産科麻酔"],
    bio: "多胎妊娠の管理を得意とし、安全な分娩をサポート。",
    languages: ["日本語"],
    specialInterests: ["多胎妊娠", "胎児超音波診断"],
    careerHistory: [
      {
        period: "2018年4月 - 現在",
        facility: "藤田医科大学病院",
        position: "産婦人科 助教",
        description: "周産期医療の臨床",
      },
    ],
    educationHistory: [
      {
        period: "2012年 - 2018年",
        institution: "藤田医科大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "周産期専門医",
        issueDate: "2021年4月",
        number: "P-2021-8901",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2018年4月",
        number: "OB-2018-9012",
      },
    ],
    researchList: [],
  },
  {
    id: "15",
    email: "ishikawa@medical.jp",
    name: "石川雄一",
    role: "doctor",
    department: "産婦人科",
    specialty: "生殖医療",
    licenseNumber: "MD-2014-067",
    joinedDate: "2014-04-01",
    experience: 10,
    certifications: ["産婦人科専門医", "生殖医療専門医", "臨床遺伝専門医"],
    publications: 16,
    availability: "occupied",
    preferredRegions: ["東京"],
    skills: ["着床前診断", "遺伝カウンセリング", "男性不妊治療"],
    bio: "生殖医療と遺伝医療の両方に精通。PGTの第一人者。",
    languages: ["日本語", "英語"],
    specialInterests: ["着床前遺伝学的検査", "遺伝カウンセリング"],
    careerHistory: [
      {
        period: "2017年4月 - 現在",
        facility: "虎ノ門病院",
        position: "生殖医療センター 部長",
        description: "生殖医療と遺伝カウンセリング",
      },
      {
        period: "2014年4月 - 2017年3月",
        facility: "国立成育医療研究センター",
        position: "周産期・母性診療センター 医員",
        description: "生殖医療と遺伝医療の研修",
      },
    ],
    educationHistory: [
      {
        period: "2008年 - 2014年",
        institution: "東京医科歯科大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "臨床遺伝専門医",
        issueDate: "2018年4月",
        number: "CG-2018-0123",
      },
      {
        name: "生殖医療専門医",
        issueDate: "2017年4月",
        number: "RM-2017-1234",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2014年4月",
        number: "OB-2014-2345",
      },
    ],
    researchList: [
      {
        year: "2024年",
        title: "着床前遺伝学的検査(PGT-M)の臨床応用",
        journal: "Human Reproduction",
        type: "論文",
      },
    ],
  },
  {
    id: "16",
    email: "maeda@medical.jp",
    name: "前田香織",
    role: "resident",
    department: "産婦人科",
    specialty: "一般産婦人科",
    licenseNumber: "MD-2022-112",
    joinedDate: "2022-04-01",
    experience: 2,
    certifications: ["医師免許"],
    availability: "available",
    preferredRegions: ["福岡", "佐賀", "長崎"],
    skills: ["正常分娩", "婦人科疾患診療"],
    bio: "九州で産婦人科医として成長中。地域医療に貢献したい。",
    languages: ["日本語"],
    specialInterests: ["周産期医療", "女性ヘルスケア"],
    careerHistory: [
      {
        period: "2022年4月 - 現在",
        facility: "九州大学病院",
        position: "産婦人科 専攻医",
        description: "産婦人科研修中",
      },
    ],
    educationHistory: [
      {
        period: "2016年 - 2022年",
        institution: "福岡大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "医師免許",
        issueDate: "2022年4月",
        number: "MD-2022-112",
      },
    ],
    researchList: [],
  },
  {
    id: "17",
    email: "fujita@medical.jp",
    name: "藤田智子",
    role: "doctor",
    department: "産婦人科",
    specialty: "女性ヘルスケア",
    licenseNumber: "MD-2015-078",
    joinedDate: "2015-04-01",
    experience: 9,
    certifications: ["産婦人科専門医", "女性ヘルスケア専門医", "スポーツドクター"],
    publications: 8,
    availability: "available",
    preferredRegions: ["東京", "神奈川"],
    skills: ["女性アスリート診療", "骨粗鬆症管理", "更年期医療"],
    bio: "女性アスリートの健康管理を専門とし、スポーツ医学にも精通。",
    languages: ["日本語", "英語"],
    specialInterests: ["女性アスリート", "スポーツ医学"],
    careerHistory: [
      {
        period: "2018年4月 - 現在",
        facility: "順天堂大学医学部附属病院",
        position: "産婦人科 講師",
        description: "女性アスリート外来担当",
      },
      {
        period: "2015年4月 - 2018年3月",
        facility: "国立スポーツ科学センター",
        position: "医科学研究部 研究員",
        description: "女性アスリートの健康管理研究",
      },
    ],
    educationHistory: [
      {
        period: "2009年 - 2015年",
        institution: "順天堂大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "スポーツドクター",
        issueDate: "2019年4月",
        number: "SD-2019-3456",
      },
      {
        name: "女性ヘルスケア専門医",
        issueDate: "2018年4月",
        number: "WH-2018-4567",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2015年4月",
        number: "OB-2015-5678",
      },
    ],
    researchList: [
      {
        year: "2024年",
        title: "女性アスリートにおける月経異常の実態調査",
        journal: "Sports Medicine",
        type: "論文",
      },
    ],
  },
  {
    id: "18",
    email: "ono@medical.jp",
    name: "小野健二",
    role: "doctor",
    department: "産婦人科",
    specialty: "腫瘍学",
    licenseNumber: "MD-2016-123",
    joinedDate: "2016-04-01",
    experience: 8,
    certifications: ["産婦人科専門医", "婦人科腫瘍専門医"],
    publications: 11,
    availability: "available",
    preferredRegions: ["北海道"],
    skills: ["婦人科がん手術", "緩和ケア", "化学療法"],
    bio: "北海道で婦人科がん治療に従事。緩和ケアにも力を入れている。",
    languages: ["日本語"],
    specialInterests: ["緩和ケア", "婦人科がん"],
    careerHistory: [
      {
        period: "2019年4月 - 現在",
        facility: "北海道大学病院",
        position: "婦人科腫瘍科 助教",
        description: "婦人科がん治療と緩和ケア",
      },
      {
        period: "2016年4月 - 2019年3月",
        facility: "市立札幌病院",
        position: "産婦人科 医員",
        description: "産婦人科全般の研修",
      },
    ],
    educationHistory: [
      {
        period: "2010年 - 2016年",
        institution: "北海道大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "婦人科腫瘍専門医",
        issueDate: "2020年4月",
        number: "GT-2020-6789",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2016年4月",
        number: "OB-2016-7890",
      },
    ],
    researchList: [],
  },
  {
    id: "19",
    email: "kato@medical.jp",
    name: "加藤由美",
    role: "doctor",
    department: "産婦人科",
    specialty: "周産期医療",
    licenseNumber: "MD-2017-089",
    joinedDate: "2017-04-01",
    experience: 7,
    certifications: ["産婦人科専門医", "周産期専門医"],
    publications: 9,
    availability: "available",
    preferredRegions: ["神奈川", "東京"],
    skills: ["ハイリスク妊娠管理", "胎児超音波", "遺伝カウンセリング"],
    bio: "出生前診断と遺伝カウンセリングを専門とし、妊婦さんに寄り添う医療を実践。",
    languages: ["日本語", "英語"],
    specialInterests: ["出生前診断", "遺伝カウンセリング"],
    careerHistory: [
      {
        period: "2019年4月 - 現在",
        facility: "神奈川県立こども医療センター",
        position: "周産期科 医長",
        description: "出生前診断と周産期管理",
      },
      {
        period: "2017年4月 - 2019年3月",
        facility: "昭和大学病院",
        position: "産婦人科 助教",
        description: "周産期医療の臨床",
      },
    ],
    educationHistory: [
      {
        period: "2011年 - 2017年",
        institution: "昭和大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "周産期専門医",
        issueDate: "2020年4月",
        number: "P-2020-7890",
      },
      {
        name: "産婦人科専門医",
        issueDate: "2017年4月",
        number: "OB-2017-8901",
      },
    ],
    researchList: [
      {
        year: "2024年",
        title: "非侵襲的出生前遺伝学的検査(NIPT)の臨床的意義",
        journal: "Prenatal Diagnosis",
        type: "論文",
      },
    ],
  },
  {
    id: "20",
    email: "yoshida@medical.jp",
    name: "吉田拓哉",
    role: "resident",
    department: "産婦人科",
    specialty: "一般産婦人科",
    licenseNumber: "MD-2023-134",
    joinedDate: "2023-04-01",
    experience: 1,
    certifications: ["医師免許"],
    availability: "available",
    preferredRegions: ["大阪", "京都", "兵庫"],
    skills: ["正常分娩", "外来診療"],
    bio: "関西で産婦人科専攻医として研修中。幅広い経験を積みたい。",
    languages: ["日本語"],
    specialInterests: ["周産期医療", "生殖医療"],
    careerHistory: [
      {
        period: "2023年4月 - 現在",
        facility: "大阪大学医学部附属病院",
        position: "産婦人科 専攻医",
        description: "産婦人科研修中",
      },
    ],
    educationHistory: [
      {
        period: "2017年 - 2023年",
        institution: "関西医科大学医学部",
        degree: "医学士",
      },
    ],
    certificationDetails: [
      {
        name: "医師免許",
        issueDate: "2023年4月",
        number: "MD-2023-134",
      },
    ],
    researchList: [],
  },
]

export const MOCK_JOB_POSTINGS: JobPosting[] = [
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
    description: "高度生殖医療を提供するクリニックでの専門医募集。最新設備が整った環境です。",
    requirements: ["生殖医療専門医", "体外受精の経験"],
    benefits: ["社会保険完備", "研究支援", "最新設備利用可", "年次休暇120日"],
    postedDate: "2025-01-08",
    deadline: "2025-03-31",
    status: "open",
    applicants: 2,
  },
  {
    id: "3",
    title: "非常勤産婦人科医師募集",
    facility: "千葉レディースクリニック",
    location: "千葉県千葉市",
    region: "千葉",
    type: "part-time",
    salary: "時給15,000円〜",
    description: "週1-2回の外来診療を担当していただける医師を募集しています。",
    requirements: ["産婦人科専門医"],
    benefits: ["柔軟な勤務時間", "交通費全額支給"],
    postedDate: "2025-01-10",
    deadline: "2025-02-15",
    status: "open",
    applicants: 5,
  },
  {
    id: "4",
    title: "周産期専門医募集",
    facility: "埼玉医科大学総合医療センター",
    location: "埼玉県川越市",
    region: "埼玉",
    type: "full-time",
    salary: "年収1300万円〜1900万円",
    description: "総合周産期母子医療センターでの勤務。ハイリスク妊娠管理の経験者歓迎。",
    requirements: ["周産期専門医", "5年以上の経験"],
    benefits: ["社会保険完備", "当直手当", "住宅補助", "研究支援"],
    postedDate: "2025-01-12",
    deadline: "2025-03-15",
    status: "open",
    applicants: 4,
  },
  {
    id: "5",
    title: "婦人科腫瘍専門医募集",
    facility: "静岡がんセンター",
    location: "静岡県駿東郡",
    region: "静岡",
    type: "full-time",
    salary: "年収1400万円〜2000万円",
    description: "婦人科がん治療の専門施設。手術、化学療法、放射線療法の経験者優遇。",
    requirements: ["婦人科腫瘍専門医", "がん治療の経験"],
    benefits: ["社会保険完備", "学会支援", "研究費支給", "住宅手当"],
    postedDate: "2025-01-13",
    deadline: "2025-04-30",
    status: "open",
    applicants: 2,
  },
  {
    id: "6",
    title: "産婦人科医師募集（大阪）",
    facility: "大阪市立総合医療センター",
    location: "大阪府大阪市",
    region: "大阪",
    type: "full-time",
    salary: "年収1100万円〜1700万円",
    description: "地域の中核病院での産婦人科医師募集。幅広い症例を経験できます。",
    requirements: ["産婦人科専門医"],
    benefits: ["社会保険完備", "当直手当", "通勤手当"],
    postedDate: "2025-01-14",
    deadline: "2025-03-31",
    status: "open",
    applicants: 6,
  },
  {
    id: "7",
    title: "生殖医療医師募集",
    facility: "名古屋レディースクリニック",
    location: "愛知県名古屋市",
    region: "愛知",
    type: "full-time",
    salary: "年収1600万円〜2200万円",
    description: "高度生殖医療専門クリニック。体外受精・顕微授精の経験者優遇。",
    requirements: ["生殖医療専門医または産婦人科専門医", "体外受精の経験"],
    benefits: ["社会保険完備", "最新設備", "年休125日", "研修支援"],
    postedDate: "2025-01-15",
    deadline: "2025-04-15",
    status: "open",
    applicants: 3,
  },
  {
    id: "8",
    title: "非常勤医師募集",
    facility: "仙台レディースクリニック",
    location: "宮城県仙台市",
    region: "宮城",
    type: "part-time",
    salary: "時給12,000円〜18,000円",
    description: "週1-3回勤務可能な非常勤医師を募集。外来診療中心。",
    requirements: ["産婦人科専門医"],
    benefits: ["交通費全額支給", "柔軟な勤務時間"],
    postedDate: "2025-01-16",
    deadline: "2025-02-28",
    status: "open",
    applicants: 8,
  },
  {
    id: "9",
    title: "産婦人科医師募集（福岡）",
    facility: "九州医療センター",
    location: "福岡県福岡市",
    region: "福岡",
    type: "full-time",
    salary: "年収1200万円〜1800万円",
    description: "九州の中核病院で産婦人科医師を募集。周産期医療に力を入れています。",
    requirements: ["産婦人科専門医", "3年以上の経験"],
    benefits: ["社会保険完備", "当直手当", "学会参加支援"],
    postedDate: "2025-01-17",
    deadline: "2025-03-31",
    status: "open",
    applicants: 4,
  },
  {
    id: "10",
    title: "女性ヘルスケア専門医募集",
    facility: "札幌ウィメンズクリニック",
    location: "北海道札幌市",
    region: "北海道",
    type: "full-time",
    salary: "年収1000万円〜1500万円",
    description: "女性の生涯にわたる健康をサポートするクリニック。更年期外来担当。",
    requirements: ["女性ヘルスケア専門医または産婦人科専門医"],
    benefits: ["社会保険完備", "年休110日", "研修支援"],
    postedDate: "2025-01-18",
    deadline: "2025-03-15",
    status: "open",
    applicants: 2,
  },
  {
    id: "11",
    title: "産婦人科指導医募集",
    facility: "広島大学病院",
    location: "広島県広島市",
    region: "広島",
    type: "full-time",
    salary: "年収1400万円〜2000万円",
    description: "大学病院での指導医募集。臨床、教育、研究のすべてに携わることができます。",
    requirements: ["産婦人科専門医", "10年以上の経験", "指導医資格"],
    benefits: ["社会保険完備", "研究費支給", "学会支援", "住宅手当"],
    postedDate: "2025-01-19",
    deadline: "2025-05-31",
    status: "open",
    applicants: 1,
  },
  {
    id: "12",
    title: "非常勤産婦人科医募集",
    facility: "京都レディースクリニック",
    location: "京都府京都市",
    region: "京都",
    type: "part-time",
    salary: "時給14,000円〜",
    description: "週2回程度の外来診療担当医師募集。不妊治療の経験者歓迎。",
    requirements: ["産婦人科専門医"],
    benefits: ["交通費全額支給", "柔軟な勤務時間"],
    postedDate: "2025-01-20",
    deadline: "2025-03-10",
    status: "open",
    applicants: 7,
  },
  {
    id: "13",
    title: "周産期医師募集（岡山）",
    facility: "岡山大学病院",
    location: "岡山県岡山市",
    region: "岡山",
    type: "full-time",
    salary: "年収1300万円〜1900万円",
    description: "総合周産期母子医療センターでの勤務。教育・研究にも参加できます。",
    requirements: ["周産期専門医または産婦人科専門医"],
    benefits: ["社会保険完備", "研究支援", "当直手当", "住宅補助"],
    postedDate: "2025-01-21",
    deadline: "2025-04-30",
    status: "open",
    applicants: 3,
  },
  {
    id: "14",
    title: "生殖医療医師募集（神戸）",
    facility: "神戸不妊クリニック",
    location: "兵庫県神戸市",
    region: "兵庫",
    type: "full-time",
    salary: "年収1500万円〜2100万円",
    description: "関西屈指の不妊治療専門クリニック。最新の生殖医療技術を提供。",
    requirements: ["生殖医療専門医", "体外受精の経験"],
    benefits: ["社会保険完備", "最新設備利用可", "年休120日"],
    postedDate: "2025-01-22",
    deadline: "2025-04-20",
    status: "open",
    applicants: 2,
  },
  {
    id: "15",
    title: "産婦人科医師募集（新潟）",
    facility: "新潟市民病院",
    location: "新潟県新潟市",
    region: "新潟",
    type: "full-time",
    salary: "年収1100万円〜1600万円",
    description: "地域の中核病院での産婦人科医師募集。ワークライフバランス重視。",
    requirements: ["産婦人科専門医"],
    benefits: ["社会保険完備", "当直手当", "住宅手当"],
    postedDate: "2025-01-23",
    deadline: "2025-03-31",
    status: "open",
    applicants: 5,
  },
  {
    id: "16",
    title: "婦人科腫瘍医募集",
    facility: "国立がん研究センター東病院",
    location: "千葉県柏市",
    region: "千葉",
    type: "full-time",
    salary: "年収1500万円〜2100万円",
    description: "国内トップクラスのがん専門病院。最先端のがん治療に携われます。",
    requirements: ["婦人科腫瘍専門医", "がん治療の豊富な経験"],
    benefits: ["社会保険完備", "研究費支給", "学会支援", "最新設備"],
    postedDate: "2025-01-24",
    deadline: "2025-05-31",
    status: "open",
    applicants: 1,
  },
  {
    id: "17",
    title: "非常勤医師募集（浜松）",
    facility: "浜松レディースクリニック",
    location: "静岡県浜松市",
    region: "静岡",
    type: "part-time",
    salary: "時給13,000円〜",
    description: "週1-2回の外来診療。女性ヘルスケアに興味のある方歓迎。",
    requirements: ["産婦人科専門医"],
    benefits: ["交通費支給", "柔軟な勤務時間"],
    postedDate: "2025-01-25",
    deadline: "2025-03-05",
    status: "open",
    applicants: 6,
  },
  {
    id: "18",
    title: "産婦人科医師募集（沖縄）",
    facility: "琉球大学病院",
    location: "沖縄県中頭郡",
    region: "沖縄",
    type: "full-time",
    salary: "年収1200万円〜1700万円",
    description: "沖縄県の中核病院で産婦人科医師募集。離島医療支援にも参加できます。",
    requirements: ["産婦人科専門医"],
    benefits: ["社会保険完備", "当直手当", "住宅手当", "離島手当"],
    postedDate: "2025-01-26",
    deadline: "2025-04-15",
    status: "open",
    applicants: 3,
  },
  {
    id: "19",
    title: "臨時医師募集",
    facility: "群馬県立小児医療センター",
    location: "群馬県渋川市",
    region: "群馬",
    type: "temporary",
    salary: "日給8万円〜",
    description: "産休代替の臨時医師募集。期間は6ヶ月程度を予定。",
    requirements: ["産婦人科専門医"],
    benefits: ["社会保険完備", "交通費支給"],
    postedDate: "2025-01-27",
    deadline: "2025-02-15",
    status: "open",
    applicants: 4,
  },
  {
    id: "20",
    title: "生殖医療医師募集（札幌）",
    facility: "札幌不妊クリニック",
    location: "北海道札幌市",
    region: "北海道",
    type: "full-time",
    salary: "年収1400万円〜1900万円",
    description: "北海道の不妊治療専門クリニック。体外受精を中心とした高度生殖医療。",
    requirements: ["生殖医療専門医または産婦人科専門医", "体外受精の経験"],
    benefits: ["社会保険完備", "研修支援", "年休115日"],
    postedDate: "2025-01-28",
    deadline: "2025-04-30",
    status: "open",
    applicants: 2,
  },
]

export function getJobPostingById(id: string): JobPosting | undefined {
  return MOCK_JOB_POSTINGS.find((job) => job.id === id)
}

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return MOCK_CASES.find((caseStudy) => caseStudy.id === id)
}

export const MOCK_CASES: CaseStudy[] = [
  {
    id: "1",
    title: "双胎妊娠における胎児発育不全の管理",
    category: "周産期",
    author: "山田太郎",
    authorId: "1",
    date: "2025-01-05",
    summary: "双胎妊娠における一児の胎児発育不全に対する管理と分娩時期の決定について。",
    diagnosis: "双胎妊娠、一児胎児発育不全（FGR）",
    treatment: "厳重なモニタリング、週2回のNST、超音波検査による胎児評価",
    outcome: "妊娠35週で選択的帝王切開を実施。母児ともに良好な経過。",
    images: ["/ultrasound-fetal-monitoring.jpg"],
    tags: ["双胎妊娠", "胎児発育不全", "周産期管理"],
    views: 234,
    comments: 12,
  },
  {
    id: "2",
    title: "卵巣刺激における OHSS 予防策",
    category: "生殖医療",
    author: "佐藤花子",
    authorId: "2",
    date: "2025-01-08",
    summary: "多嚢胞性卵巣症候群患者における卵巣過剰刺激症候群の予防と管理。",
    diagnosis: "PCOS、体外受精施行",
    treatment: "低用量ゴナドトロピン療法、GnRHアゴニストトリガー",
    outcome: "OHSS発症なく、良好な採卵結果を得た。",
    images: ["/ovarian-ultrasound-pcos.jpg"],
    tags: ["PCOS", "OHSS", "体外受精"],
    views: 189,
    comments: 8,
  },
  {
    id: "3",
    title: "子宮頸がんⅠb2期に対する治療選択",
    category: "腫瘍学",
    author: "田中健一",
    authorId: "3",
    date: "2025-01-12",
    summary: "若年子宮頸がん患者における妊孕性温存を考慮した治療戦略。",
    diagnosis: "子宮頸がん Ⅰb2期",
    treatment: "術前化学療法後、広汎子宮頸部摘出術",
    outcome: "病理学的完全奏効、妊孕性温存に成功。",
    images: ["/cervical-cancer-medical-imaging.jpg"],
    tags: ["子宮頸がん", "妊孕性温存", "化学療法"],
    views: 312,
    comments: 15,
  },
  {
    id: "4",
    title: "妊娠高血圧症候群の管理",
    category: "周産期",
    author: "伊藤大輔",
    authorId: "9",
    date: "2025-01-14",
    summary: "妊娠高血圧症候群における降圧療法と分娩時期の決定について。",
    diagnosis: "妊娠高血圧症候群（重症）",
    treatment: "入院管理、降圧薬投与、胎児モニタリング",
    outcome: "妊娠34週で帝王切開。母児ともに良好な経過。",
    tags: ["妊娠高血圧", "周産期管理", "帝王切開"],
    views: 156,
    comments: 9,
  },
  {
    id: "5",
    title: "卵巣がんⅢc期の治療戦略",
    category: "腫瘍学",
    author: "木村翔太",
    authorId: "13",
    date: "2025-01-15",
    summary: "進行卵巣がんに対する腫瘍減量術と化学療法の組み合わせ。",
    diagnosis: "卵巣がん Ⅲc期",
    treatment: "初回腫瘍減量術、術後TC療法6コース",
    outcome: "完全奏効達成。無増悪生存期間18ヶ月継続中。",
    tags: ["卵巣がん", "化学療法", "手術"],
    views: 278,
    comments: 14,
  },
  {
    id: "6",
    title: "習慣流産に対するアプローチ",
    category: "生殖医療",
    author: "高橋真理子",
    authorId: "10",
    date: "2025-01-16",
    summary: "3回の流産歴を持つ患者への検査と治療方針。",
    diagnosis: "習慣流産、抗リン脂質抗体症候群",
    treatment: "低用量アスピリン、ヘパリン投与",
    outcome: "妊娠成立、妊娠継続中（現在22週）。",
    tags: ["習慣流産", "抗リン脂質抗体", "妊娠管理"],
    views: 201,
    comments: 11,
  },
  {
    id: "7",
    title: "子宮筋腫に対する腹腔鏡手術",
    category: "手術",
    author: "山本隆志",
    authorId: "7",
    date: "2025-01-17",
    summary: "多発子宮筋腫に対する腹腔鏡下筋腫核出術の手技と注意点。",
    diagnosis: "多発子宮筋腫（最大径8cm）",
    treatment: "腹腔鏡下子宮筋腫核出術",
    outcome: "手術時間180分、出血量250ml。術後経過良好。",
    tags: ["子宮筋腫", "腹腔鏡手術", "低侵襲手術"],
    views: 345,
    comments: 18,
  },
  {
    id: "8",
    title: "前置胎盤の管理と分娩",
    category: "周産期",
    author: "林美穂",
    authorId: "14",
    date: "2025-01-18",
    summary: "全前置胎盤症例における妊娠管理と計画的帝王切開。",
    diagnosis: "全前置胎盤",
    treatment: "厳重な妊娠管理、妊娠37週で計画的帝王切開",
    outcome: "出血量1200ml。輸血なし。母児ともに良好。",
    tags: ["前置胎盤", "帝王切開", "周産期管理"],
    views: 187,
    comments: 10,
  },
  {
    id: "9",
    title: "着床前遺伝学的検査の実施例",
    category: "生殖医療",
    author: "石川雄一",
    authorId: "15",
    date: "2025-01-19",
    summary: "染色体転座保因者に対するPGT-SRの実施と妊娠成功例。",
    diagnosis: "反復流産、均衡型相互転座保因者",
    treatment: "体外受精、PGT-SR、正常胚移植",
    outcome: "妊娠成立、現在妊娠継続中（16週）。",
    tags: ["PGT", "着床前診断", "染色体異常"],
    views: 223,
    comments: 13,
  },
  {
    id: "10",
    title: "子宮内膜症に対する治療選択",
    category: "一般婦人科",
    author: "井上さくら",
    authorId: "12",
    date: "2025-01-20",
    summary: "重度月経困難症を伴う子宮内膜症の薬物療法と手術療法の選択。",
    diagnosis: "子宮内膜症、チョコレート嚢胞",
    treatment: "GnRHアゴニスト療法6ヶ月後、腹腔鏡下嚢胞摘出術",
    outcome: "症状改善、術後低用量ピルで管理中。",
    tags: ["子宮内膜症", "月経困難症", "腹腔鏡手術"],
    views: 267,
    comments: 15,
  },
  {
    id: "11",
    title: "早産予防の管理戦略",
    category: "周産期",
    author: "加藤由美",
    authorId: "19",
    date: "2025-01-21",
    summary: "子宮頸管短縮を伴う切迫早産の管理と予後。",
    diagnosis: "切迫早産、子宮頸管長15mm（妊娠24週）",
    treatment: "入院安静、硫酸マグネシウム点滴、子宮収縮抑制剤",
    outcome: "妊娠36週まで妊娠継続、経腟分娩で健児獲得。",
    tags: ["早産", "子宮頸管短縮", "周産期管理"],
    views: 198,
    comments: 12,
  },
  {
    id: "12",
    title: "更年期障害に対するHRT",
    category: "女性ヘルスケア",
    author: "中村優子",
    authorId: "8",
    date: "2025-01-22",
    summary: "重度の更年期症状に対するホルモン補充療法の効果。",
    diagnosis: "更年期障害（重症）",
    treatment: "経皮エストラジオール+黄体ホルモン併用療法",
    outcome: "症状スコア大幅改善、QOL向上。",
    tags: ["更年期", "HRT", "女性ヘルスケア"],
    views: 174,
    comments: 8,
  },
  {
    id: "13",
    title: "帝王切開瘢痕症候群の診断と治療",
    category: "一般婦人科",
    author: "渡辺誠",
    authorId: "5",
    date: "2025-01-23",
    summary: "帝王切開術後の瘢痕部憩室による月経異常の治療。",
    diagnosis: "帝王切開瘢痕症候群、過多月経",
    treatment: "子宮鏡下瘢痕部形成術",
    outcome: "月経量正常化、症状改善。",
    tags: ["帝王切開", "瘢痕症候群", "子宮鏡手術"],
    views: 156,
    comments: 7,
  },
  {
    id: "14",
    title: "子宮頸がん術後補助療法",
    category: "腫瘍学",
    author: "小野健二",
    authorId: "18",
    date: "2025-01-24",
    summary: "子宮頸がんⅠb2期に対する術後化学放射線療法の実施。",
    diagnosis: "子宮頸がん Ⅰb2期、術後リンパ節転移陽性",
    treatment: "広汎子宮全摘術後、化学放射線療法",
    outcome: "2年無再発生存中。",
    tags: ["子宮頸がん", "化学放射線療法", "術後補助療法"],
    views: 192,
    comments: 10,
  },
  {
    id: "15",
    title: "女性アスリートの月経管理",
    category: "女性ヘルスケア",
    author: "藤田智子",
    authorId: "17",
    date: "2025-01-25",
    summary: "競技選手における月経周期調整と貧血管理。",
    diagnosis: "運動性無月経、鉄欠乏性貧血",
    treatment: "低用量ピルによる月経周期調整、鉄剤投与、栄養指導",
    outcome: "月経再開、貧血改善、競技パフォーマンス向上。",
    tags: ["女性アスリート", "月経異常", "スポーツ医学"],
    views: 234,
    comments: 14,
  },
]

export const MOCK_EDUCATION: EducationContent[] = [
  {
    id: "1",
    title: "胎児心拍数モニタリングの基礎",
    type: "video",
    category: "周産期",
    instructor: "山田太郎",
    duration: "45分",
    level: "beginner",
    description: "胎児心拍数モニタリングの基本的な読み方と解釈について学びます。",
    views: 567,
    rating: 4.8,
    publishedDate: "2024-12-15",
    tags: ["胎児心拍", "モニタリング", "基礎"],
  },
  {
    id: "2",
    title: "体外受精の最新技術",
    type: "webinar",
    category: "生殖医療",
    instructor: "佐藤花子",
    duration: "90分",
    level: "advanced",
    description: "タイムラプスインキュベーターや着床前診断など、最新の体外受精技術について。",
    views: 423,
    rating: 4.9,
    publishedDate: "2025-01-10",
    tags: ["体外受精", "タイムラプス", "PGT-A"],
  },
  {
    id: "3",
    title: "婦人科腫瘍手術のコツ",
    type: "document",
    category: "腫瘍学",
    instructor: "田中健一",
    level: "intermediate",
    description: "婦人科腫瘍手術における基本手技と合併症回避のポイント。",
    views: 298,
    rating: 4.7,
    publishedDate: "2025-01-03",
    tags: ["手術", "婦人科腫瘍", "テクニック"],
  },
  {
    id: "4",
    title: "産婦人科超音波診断入門",
    type: "course",
    category: "診断",
    instructor: "山田太郎",
    duration: "5時間",
    level: "beginner",
    description: "産婦人科における超音波診断の基礎から応用まで、体系的に学習できるコース。",
    views: 891,
    rating: 4.9,
    publishedDate: "2024-11-20",
    tags: ["超音波", "診断", "コース"],
  },
  {
    id: "5",
    title: "産科超音波の基本スキャン",
    type: "video",
    category: "周産期",
    instructor: "加藤由美",
    duration: "60分",
    level: "beginner",
    description: "妊婦健診における基本的な超音波スキャン手技を学びます。",
    views: 678,
    rating: 4.7,
    publishedDate: "2024-12-20",
    tags: ["超音波", "妊婦健診", "基礎"],
  },
  {
    id: "6",
    title: "腹腔鏡手術の基本手技",
    type: "video",
    category: "手術",
    instructor: "山本隆志",
    duration: "120分",
    level: "intermediate",
    description: "婦人科腹腔鏡手術の基本的な手技とトラブルシューティング。",
    views: 512,
    rating: 4.9,
    publishedDate: "2024-12-25",
    tags: ["腹腔鏡", "手術", "手技"],
  },
  {
    id: "7",
    title: "不妊カウンセリングの実践",
    type: "webinar",
    category: "生殖医療",
    instructor: "小林愛",
    duration: "90分",
    level: "intermediate",
    description: "不妊治療における効果的なカウンセリング技法とコミュニケーション。",
    views: 389,
    rating: 4.8,
    publishedDate: "2025-01-05",
    tags: ["カウンセリング", "不妊治療", "コミュニケーション"],
  },
  {
    id: "8",
    title: "妊娠高血圧症候群の診断と管理",
    type: "document",
    category: "周産期",
    instructor: "伊藤大輔",
    level: "intermediate",
    description: "妊娠高血圧症候群の診断基準、重症度評価、管理プロトコル。",
    views: 445,
    rating: 4.6,
    publishedDate: "2025-01-08",
    tags: ["妊娠高血圧", "周産期", "管理"],
  },
  {
    id: "9",
    title: "婦人科がん化学療法の実際",
    type: "course",
    category: "腫瘍学",
    instructor: "木村翔太",
    duration: "8時間",
    level: "advanced",
    description: "婦人科がんに対する化学療法のレジメン選択から副作用管理まで。",
    views: 356,
    rating: 4.9,
    publishedDate: "2024-11-15",
    tags: ["化学療法", "婦人科がん", "治療"],
  },
  {
    id: "10",
    title: "子宮内膜症の診断と治療",
    type: "webinar",
    category: "一般婦人科",
    instructor: "井上さくら",
    duration: "75分",
    level: "beginner",
    description: "子宮内膜症の診断方法と薬物療法・手術療法の選択基準。",
    views: 523,
    rating: 4.7,
    publishedDate: "2025-01-10",
    tags: ["子宮内膜症", "診断", "治療"],
  },
  {
    id: "11",
    title: "更年期医療の最新知見",
    type: "video",
    category: "女性ヘルスケア",
    instructor: "中村優子",
    duration: "50分",
    level: "intermediate",
    description: "更年期障害の診断とホルモン補充療法の最新エビデンス。",
    views: 412,
    rating: 4.8,
    publishedDate: "2025-01-12",
    tags: ["更年期", "HRT", "エビデンス"],
  },
  {
    id: "12",
    title: "PGT-Aの基礎と臨床応用",
    type: "webinar",
    category: "生殖医療",
    instructor: "石川雄一",
    duration: "100分",
    level: "advanced",
    description: "着床前遺伝学的検査の原理と臨床での活用法。",
    views: 298,
    rating: 4.9,
    publishedDate: "2025-01-15",
    tags: ["PGT", "着床前診断", "遺伝"],
  },
  {
    id: "13",
    title: "帝王切開の合併症予防",
    type: "document",
    category: "周産期",
    instructor: "渡辺誠",
    level: "intermediate",
    description: "帝王切開術における合併症予防と安全な手術手技。",
    views: 467,
    rating: 4.7,
    publishedDate: "2025-01-17",
    tags: ["帝王切開", "合併症", "手術"],
  },
  {
    id: "14",
    title: "女性アスリートの健康管理",
    type: "course",
    category: "女性ヘルスケア",
    instructor: "藤田智子",
    duration: "4時間",
    level: "intermediate",
    description: "女性アスリートに特有の健康問題と対応策。",
    views: 334,
    rating: 4.8,
    publishedDate: "2024-12-10",
    tags: ["女性アスリート", "スポーツ医学", "健康管理"],
  },
  {
    id: "15",
    title: "緩和ケアの基本",
    type: "video",
    category: "腫瘍学",
    instructor: "小野健二",
    duration: "65分",
    level: "beginner",
    description: "婦人科がん患者における緩和ケアの基本的な考え方と実践。",
    views: 389,
    rating: 4.6,
    publishedDate: "2025-01-20",
    tags: ["緩和ケア", "婦人科がん", "QOL"],
  },
]

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "info",
    title: "新しい求人情報",
    message: "横浜総合病院から新しい求人が投稿されました",
    date: "2025-01-05",
    read: false,
    link: "/matching",
  },
  {
    id: "2",
    type: "success",
    title: "症例登録完了",
    message: "あなたの症例「双胎妊娠における胎児発育不全の管理」が承認されました",
    date: "2025-01-05",
    read: true,
  },
  {
    id: "3",
    type: "info",
    title: "新しいウェビナー",
    message: "「体外受精の最新技術」ウェビナーが公開されました",
    date: "2025-01-10",
    read: false,
    link: "/education",
  },
  {
    id: "4",
    type: "warning",
    title: "プロフィール更新のお願い",
    message: "プロフィール情報を最新の状態に更新してください",
    date: "2025-01-12",
    read: false,
    link: "/profile",
  },
  {
    id: "5",
    type: "success",
    title: "応募が受理されました",
    message: "横浜総合病院への応募が正常に受理されました",
    date: "2025-01-11",
    read: true,
  },
  {
    id: "6",
    type: "info",
    title: "新しいメッセージ",
    message: "田中健一先生からメッセージが届いています",
    date: "2025-01-14",
    read: false,
    link: "/messages",
  },
  {
    id: "7",
    type: "warning",
    title: "求人応募期限",
    message: "東京不妊クリニックの求人応募期限が近づいています",
    date: "2025-01-15",
    read: false,
    link: "/matching/2",
  },
  {
    id: "8",
    type: "info",
    title: "新しい症例が登録されました",
    message: "「妊娠高血圧症候群の管理」が公開されました",
    date: "2025-01-14",
    read: true,
    link: "/cases/4",
  },
  {
    id: "9",
    type: "success",
    title: "コメントへの返信",
    message: "あなたの質問に山田太郎先生が回答しました",
    date: "2025-01-13",
    read: true,
    link: "/board/2",
  },
  {
    id: "10",
    type: "info",
    title: "グループメッセージ",
    message: "周産期医療研究グループに新しいメッセージがあります",
    date: "2025-01-15",
    read: false,
    link: "/messages/2",
  },
  {
    id: "11",
    type: "warning",
    title: "イベントリマインダー",
    message: "明日19時からオンライン勉強会が開催されます",
    date: "2025-01-14",
    read: false,
    link: "/board/4",
  },
  {
    id: "12",
    type: "success",
    title: "論文登録完了",
    message: "研究実績が正常に登録されました",
    date: "2025-01-12",
    read: true,
  },
  {
    id: "13",
    type: "info",
    title: "新しい教育コンテンツ",
    message: "「腹腔鏡手術の基本手技」が公開されました",
    date: "2024-12-25",
    read: true,
    link: "/education/6",
  },
  {
    id: "14",
    type: "info",
    title: "求人情報更新",
    message: "あなたの希望条件に合う新しい求人が投稿されました",
    date: "2025-01-13",
    read: false,
    link: "/matching",
  },
  {
    id: "15",
    type: "warning",
    title: "プロフィール画像",
    message: "プロフィール画像を設定すると、より多くの医師とつながれます",
    date: "2025-01-10",
    read: true,
  },
]

export const MOCK_BOARD_POSTS: BoardPost[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "2025年度地域医療連携会議のお知らせ",
    content:
      "2025年3月15日（土）に地域医療連携会議を開催いたします。各施設からの参加をお待ちしております。テーマは「産科救急の地域連携強化」です。",
    author: "山田太郎",
    authorId: "1",
    category: "announcement",
    date: "2025-01-10",
    replies: 8,
    views: 156,
    tags: ["地域連携", "会議", "産科救急"],
    isPinned: true,
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    title: "胎児心拍数モニタリングの判読について",
    content:
      "late decelerationとvariable decelerationの鑑別について、皆さんのご意見をお聞かせください。特に複雑なパターンの場合の対応について。",
    author: "鈴木美咲",
    authorId: "4",
    category: "qa",
    date: "2025-01-12",
    replies: 15,
    views: 203,
    tags: ["胎児心拍", "モニタリング", "質問"],
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    title: "新しい超音波機器の導入について",
    content: "当院で最新の4D超音波機器を導入しました。見学希望の方々がいらっしゃいましたらご連絡ください。",
    author: "佐藤花子",
    authorId: "2",
    category: "general",
    date: "2025-01-08",
    replies: 6,
    views: 124,
    tags: ["超音波", "機器", "導入"],
  },
  {
    id: "d4e5f6a7-b8c9-0123-def1-234567890123",
    title: "オンライン勉強会のご案内",
    content:
      "月1回のオンライン勉強会を開催しています。次回は「周産期メンタルヘルス」をテーマに、2月20日19時からZoomで実施します。",
    author: "田中健一",
    authorId: "3",
    category: "event",
    date: "2025-01-11",
    replies: 12,
    views: 187,
    tags: ["勉強会", "オンライン", "メンタルヘルス"],
  },
  {
    id: "e5f6a7b8-c9d0-1234-ef12-345678901234",
    title: "産科救急の初期対応について",
    content:
      "産科出血への初期対応について、皆さんの施設のプロトコルを教えてください。特に大量出血時の対応手順について意見交換したいです。",
    author: "渡辺誠",
    authorId: "5",
    category: "qa",
    date: "2025-01-13",
    replies: 18,
    views: 245,
    tags: ["産科救急", "産科出血", "プロトコル"],
  },
  {
    id: "f6a7b8c9-d0e1-2345-f123-456789012345",
    title: "腹腔鏡手術の合併症予防",
    content: "婦人科腹腔鏡手術における血管損傷や臓器損傷の予防策について、経験豊富な先生方のアドバイスをお願いします。",
    author: "松本健太",
    authorId: "11",
    category: "qa",
    date: "2025-01-14",
    replies: 12,
    views: 178,
    tags: ["腹腔鏡手術", "合併症", "質問"],
  },
  {
    id: "a7b8c9d0-e1f2-3456-1234-567890123456",
    title: "オンライン診療導入の経験談",
    content:
      "当院でもオンライン診療の導入を検討しています。既に導入されている施設の先生方、メリット・デメリットを教えていただけますか?",
    author: "小林愛",
    authorId: "6",
    category: "general",
    date: "2025-01-15",
    replies: 14,
    views: 192,
    tags: ["オンライン診療", "遠隔医療", "経験談"],
  },
  {
    id: "b8c9d0e1-f2a3-4567-2345-678901234567",
    title: "学会参加報告：日本産科婦人科学会",
    content:
      "先日の学会に参加してきました。特に印象的だったセッションについて共有させてください。最新の周産期医療の話題が満載でした。",
    author: "伊藤大輔",
    authorId: "9",
    category: "general",
    date: "2025-01-16",
    replies: 9,
    views: 167,
    tags: ["学会", "周産期医療", "報告"],
  },
  {
    id: "c9d0e1f2-a3b4-5678-3456-789012345678",
    title: "地域医療連携フォーラムのご案内",
    content:
      "3月に地域医療連携フォーラムを開催します。テーマは「産婦人科における病診連携の強化」です。多数のご参加をお待ちしています。",
    author: "高橋真理子",
    authorId: "10",
    category: "event",
    date: "2025-01-17",
    replies: 7,
    views: 134,
    tags: ["フォーラム", "地域連携", "イベント"],
  },
  {
    id: "d0e1f2a3-b4c5-6789-4567-890123456789",
    title: "婦人科がん検診の精度管理",
    content:
      "子宮頸がん検診の精度管理について、各施設での取り組みを共有しませんか? 細胞診の判定基準や精密検査への移行基準など。",
    author: "木村翔太",
    authorId: "13",
    category: "general",
    date: "2025-01-18",
    replies: 11,
    views: 156,
    tags: ["がん検診", "精度管理", "子宮頸がん"],
  },
  {
    id: "e1f2a3b4-c5d6-7890-5678-901234567890",
    title: "不妊治療の保険適用について",
    content: "不妊治療の保険適用が拡大されましたが、実際の運用で困っていることはありませんか? 情報交換しましょう。",
    author: "佐藤花子",
    authorId: "2",
    category: "qa",
    date: "2025-01-19",
    replies: 20,
    views: 289,
    tags: ["不妊治療", "保険適用", "制度"],
  },
  {
    id: "f2a3b4c5-d6e7-8901-6789-012345678901",
    title: "医療安全研修会のお知らせ",
    content:
      "2月10日に医療安全研修会を開催します。テーマは「産婦人科におけるインシデント事例から学ぶ」です。オンライン参加も可能です。",
    author: "山田太郎",
    authorId: "1",
    category: "announcement",
    date: "2025-01-20",
    replies: 5,
    views: 145,
    tags: ["医療安全", "研修会", "インシデント"],
    isPinned: true,
  },
  {
    id: "a3b4c5d6-e7f8-9012-7890-123456789012",
    title: "若手医師向けセミナー開催",
    content:
      "専攻医・若手医師向けのセミナーを企画中です。ベテランの先生方から実践的なアドバイスをいただける機会にしたいと思います。",
    author: "鈴木美咲",
    authorId: "4",
    category: "event",
    date: "2025-01-21",
    replies: 16,
    views: 201,
    tags: ["若手医師", "セミナー", "教育"],
  },
  {
    id: "b4c5d6e7-f8a9-0123-8901-234567890123",
    title: "帝王切開後の妊娠管理",
    content:
      "帝王切開既往のある妊婦の次回妊娠管理について、VBACの適応基準や反復帝王切開の時期など、各施設のプロトコルを教えてください。",
    author: "林美穂",
    authorId: "14",
    category: "qa",
    date: "2025-01-22",
    replies: 13,
    views: 187,
    tags: ["帝王切開", "VBAC", "妊娠管理"],
  },
  {
    id: "c5d6e7f8-a9b0-1234-9012-345678901234",
    title: "新しい超音波機器の性能比較",
    content:
      "施設の超音波機器の更新を検討しています。最新機種を使用されている先生方、使い心地や性能について情報をいただけませんか?",
    author: "加藤由美",
    authorId: "19",
    category: "general",
    date: "2025-01-23",
    replies: 10,
    views: 172,
    tags: ["超音波機器", "機器更新", "情報交換"],
  },
]

export const MOCK_SPONSOR_ADS: SponsorAd[] = [
  {
    id: "1",
    company: "メディカル製薬株式会社",
    logo: "/pharmaceutical-company-logo.png",
    title: "最新の産科医療ソリューション",
    description: "安全で効果的な周産期医療をサポートする医薬品をご提供しています。",
    link: "#",
    type: "card",
  },
  {
    id: "2",
    company: "ヘルスケア保険",
    logo: "/health-insurance-logo.png",
    title: "医療従事者向け保険プラン",
    description: "医師のための包括的な保険プログラム。安心の医療活動をサポートします。",
    link: "#",
    type: "card",
  },
  {
    id: "3",
    company: "メディテック機器",
    logo: "/medical-device-logo.png",
    title: "次世代医療機器のご紹介",
    description: "最新の超音波診断装置、手術支援システムなど、先進的な医療機器をご提案。",
    link: "#",
    type: "card",
  },
  {
    id: "4",
    company: "バイオファーマ",
    logo: "/biotech-company-logo.jpg",
    title: "生殖医療の革新的治療薬",
    description: "不妊治療の成功率を高める最新のバイオ医薬品開発に取り組んでいます。",
    link: "#",
    type: "card",
  },
]

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    type: "direct",
    participants: ["1", "2"],
    participantNames: ["山田太郎", "佐藤花子"],
    lastMessage: {
      id: "msg-1",
      conversationId: "1",
      senderId: "2",
      senderName: "佐藤花子",
      content: "先日の症例について、もう少し詳しく教えていただけますか?",
      timestamp: "2025-01-15T14:30:00",
      read: false,
    },
    unreadCount: 2,
    createdAt: "2025-01-10T10:00:00",
    updatedAt: "2025-01-15T14:30:00",
  },
  {
    id: "2",
    type: "group",
    name: "周産期医療研究グループ",
    participants: ["1", "2", "3", "4"],
    participantNames: ["山田太郎", "佐藤花子", "田中健一", "鈴木美咲"],
    description: "周産期医療に関する情報共有と研究ディスカッション",
    lastMessage: {
      id: "msg-2",
      conversationId: "2",
      senderId: "1",
      senderName: "山田太郎",
      content: "次回の勉強会は来週金曜日19時からでよろしいでしょうか?",
      timestamp: "2025-01-15T16:45:00",
      read: true,
    },
    unreadCount: 0,
    createdAt: "2024-12-01T09:00:00",
    updatedAt: "2025-01-15T16:45:00",
  },
  {
    id: "3",
    type: "direct",
    participants: ["1", "3"],
    participantNames: ["山田太郎", "田中健一"],
    lastMessage: {
      id: "msg-3",
      conversationId: "3",
      senderId: "3",
      senderName: "田中健一",
      content: "紹介患者の件でご相談があります。",
      timestamp: "2025-01-14T11:20:00",
      read: true,
    },
    unreadCount: 0,
    createdAt: "2024-11-15T14:00:00",
    updatedAt: "2025-01-14T11:20:00",
  },
  {
    id: "4",
    type: "group",
    name: "地域医療連携ネットワーク",
    participants: ["1", "2", "3"],
    participantNames: ["山田太郎", "佐藤花子", "田中健一"],
    description: "地域医療機関との連携強化のための情報交換グループ",
    lastMessage: {
      id: "msg-4",
      conversationId: "4",
      senderId: "2",
      senderName: "佐藤花子",
      content: "資料を共有しました。ご確認ください。",
      timestamp: "2025-01-13T15:00:00",
      read: true,
    },
    unreadCount: 0,
    createdAt: "2024-10-01T10:00:00",
    updatedAt: "2025-01-13T15:00:00",
  },
  {
    id: "5",
    type: "direct",
    participants: ["1", "4"],
    participantNames: ["山田太郎", "鈴木美咲"],
    lastMessage: {
      id: "msg-5",
      conversationId: "5",
      senderId: "4",
      senderName: "鈴木美咲",
      content: "ご指導ありがとうございました!",
      timestamp: "2025-01-12T18:30:00",
      read: true,
    },
    unreadCount: 0,
    createdAt: "2025-01-05T09:00:00",
    updatedAt: "2025-01-12T18:30:00",
  },
]

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    {
      id: "msg-1-1",
      conversationId: "1",
      senderId: "1",
      senderName: "山田太郎",
      content: "佐藤先生、お疲れ様です。",
      timestamp: "2025-01-15T14:00:00",
      read: true,
    },
    {
      id: "msg-1-2",
      conversationId: "1",
      senderId: "2",
      senderName: "佐藤花子",
      content: "お疲れ様です。先日の症例について、もう少し詳しく教えていただけますか?",
      timestamp: "2025-01-15T14:30:00",
      read: false,
    },
    {
      id: "msg-1-3",
      conversationId: "1",
      senderId: "2",
      senderName: "佐藤花子",
      content: "特に治療方針の決定プロセスについて知りたいです。",
      timestamp: "2025-01-15T14:31:00",
      read: false,
    },
  ],
  "2": [
    {
      id: "msg-2-1",
      conversationId: "2",
      senderId: "1",
      senderName: "山田太郎",
      content: "皆様、周産期医療研究グループへようこそ。活発な議論をお願いします。",
      timestamp: "2024-12-01T09:00:00",
      read: true,
    },
    {
      id: "msg-2-2",
      conversationId: "2",
      senderId: "2",
      senderName: "佐藤花子",
      content: "よろしくお願いします!",
      timestamp: "2024-12-01T09:15:00",
      read: true,
    },
    {
      id: "msg-2-3",
      conversationId: "2",
      senderId: "3",
      senderName: "田中健一",
      content: "参加させていただきます。よろしくお願いいたします。",
      timestamp: "2024-12-01T10:30:00",
      read: true,
    },
    {
      id: "msg-2-4",
      conversationId: "2",
      senderId: "4",
      senderName: "鈴木美咲",
      content: "勉強させていただきます。よろしくお願いします!",
      timestamp: "2024-12-01T11:00:00",
      read: true,
    },
    {
      id: "msg-2-5",
      conversationId: "2",
      senderId: "1",
      senderName: "山田太郎",
      content: "次回の勉強会は来週金曜日19時からでよろしいでしょうか?",
      timestamp: "2025-01-15T16:45:00",
      read: true,
    },
  ],
  "3": [
    {
      id: "msg-3-1",
      conversationId: "3",
      senderId: "3",
      senderName: "田中健一",
      content: "紹介患者の件でご相談があります。",
      timestamp: "2025-01-14T11:20:00",
      read: true,
    },
    {
      id: "msg-3-2",
      conversationId: "3",
      senderId: "1",
      senderName: "山田太郎",
      content: "承知しました。詳細を教えてください。",
      timestamp: "2025-01-14T11:25:00",
      read: true,
    },
  ],
  "4": [
    {
      id: "msg-4-1",
      conversationId: "4",
      senderId: "1",
      senderName: "山田太郎",
      content: "地域医療連携ネットワークグループを開設しました。",
      timestamp: "2024-10-01T10:00:00",
      read: true,
    },
    {
      id: "msg-4-2",
      conversationId: "4",
      senderId: "2",
      senderName: "佐藤花子",
      content: "資料を共有しました。ご確認ください。",
      timestamp: "2025-01-13T15:00:00",
      read: true,
    },
  ],
  "5": [
    {
      id: "msg-5-1",
      conversationId: "5",
      senderId: "4",
      senderName: "鈴木美咲",
      content: "先日はご指導ありがとうございました。",
      timestamp: "2025-01-12T18:00:00",
      read: true,
    },
    {
      id: "msg-5-2",
      conversationId: "5",
      senderId: "1",
      senderName: "山田太郎",
      content: "いえいえ、また何かあればいつでも聞いてください。",
      timestamp: "2025-01-12T18:15:00",
      read: true,
    },
    {
      id: "msg-5-3",
      conversationId: "5",
      senderId: "4",
      senderName: "鈴木美咲",
      content: "ご指導ありがとうございました!",
      timestamp: "2025-01-12T18:30:00",
      read: true,
    },
  ],
}

export function getConversationById(id: string): Conversation | undefined {
  return MOCK_CONVERSATIONS.find((conv) => conv.id === id)
}

export function getMessagesByConversationId(conversationId: string): Message[] {
  return MOCK_MESSAGES[conversationId] || []
}

export function getDoctorById(id: string): DoctorProfile | undefined {
  return MOCK_DOCTORS.find((doctor) => doctor.id === id)
}

export const MOCK_DONATION_PROJECTS = [
  {
    id: "1",
    title: "地域医療連携強化プロジェクト",
    description: "地域の産婦人科医療機関のネットワーク強化と情報共有システムの拡充",
    detailedDescription: `このプロジェクトは、地域の産婦人科医療機関が連携し、患者さんにより良い医療サービスを提供するための基盤を構築します。

主な取り組み:
• 医療機関間の情報共有システムの構築と運用
• 定期的な連携会議の開催と情報交換
• 緊急時の連携体制の強化
• 患者紹介システムの最適化

これまでの成果:
• 連携医療機関数: 45施設
• 情報共有システム利用率: 92%
• 患者満足度: 4.7/5.0
• 緊急時の連携対応時間: 平均15分短縮`,
    goal: 5000000,
    current: 3250000,
    supporters: 124,
    category: "医療連携",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    image: "/placeholder.svg?height=400&width=800",
    updates: [
      {
        date: "2024-01-15",
        title: "連携システムの導入完了",
        content: "45の医療機関への情報共有システムの導入が完了しました。",
      },
      {
        date: "2024-01-08",
        title: "第1回連携会議開催",
        content: "参加医療機関の代表者による連携会議を開催し、今後の方針を協議しました。",
      },
    ],
    benefits: ["地域医療の質の向上", "患者さんの利便性向上", "医療機関間の連携強化", "緊急時の迅速な対応"],
  },
  {
    id: "2",
    title: "医師教育・研修プログラム",
    description: "若手医師の育成と専門医の継続的な教育プログラムの提供",
    detailedDescription: `次世代の産婦人科医を育成し、高度な専門知識と技術を持つ医師を増やすためのプログラムです。

プログラム内容:
• 若手医師向けの実践的研修
• 専門医の継続教育セミナー
• 海外研修の支援
• オンライン教育コンテンツの充実

実績:
• 年間研修受講者数: 180名
• 専門医試験合格率: 95%
• 海外研修派遣者数: 12名
• 教育コンテンツ利用数: 5,000回/月`,
    goal: 3000000,
    current: 1800000,
    supporters: 89,
    category: "教育・研修",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    image: "/placeholder.svg?height=400&width=800",
    updates: [
      {
        date: "2024-01-12",
        title: "新しい研修プログラムを開始",
        content: "最新の医療技術を学ぶ実践的な研修プログラムを開始しました。",
      },
      {
        date: "2024-01-05",
        title: "オンライン教育コンテンツ拡充",
        content: "50本の新しい教育動画を追加し、より充実した学習環境を提供します。",
      },
    ],
    benefits: ["若手医師の育成", "医療技術の向上", "専門医の質の向上", "地域医療への貢献"],
  },
  {
    id: "3",
    title: "最新医療設備導入支援",
    description: "地域医療機関への最新医療設備導入支援と共同利用体制の構築",
    detailedDescription: `最新の医療設備を導入し、地域の医療機関で共同利用できる体制を構築するプロジェクトです。

導入予定設備:
• 最新超音波診断装置
• 胎児モニタリングシステム
• 内視鏡手術システム
• 遠隔診療システム

期待される効果:
• 診断精度の向上
• 低侵襲治療の実現
• 地域医療格差の解消
• 医療コストの最適化

進捗状況:
• 設備調査: 完了
• 導入計画: 策定中
• 共同利用体制: 検討中`,
    goal: 10000000,
    current: 4500000,
    supporters: 156,
    category: "設備・施設",
    startDate: "2024-01-01",
    endDate: "2025-03-31",
    image: "/placeholder.svg?height=400&width=800",
    updates: [
      {
        date: "2024-01-10",
        title: "設備導入計画の策定",
        content: "専門家チームによる設備導入計画を策定し、効果的な配置を検討しています。",
      },
    ],
    benefits: ["医療技術の向上", "患者負担の軽減", "地域医療の充実", "医療機関の連携強化"],
  },
]

export const MOCK_RECENT_DONATIONS = [
  {
    id: "1",
    name: "匿名希望",
    amount: 50000,
    date: "2024-01-15",
    message: "地域医療の発展を応援しています",
    projectId: "1",
  },
  {
    id: "2",
    name: "田中医院",
    amount: 100000,
    date: "2024-01-14",
    message: "連携強化に期待しています",
    projectId: "1",
  },
  { id: "3", name: "山田太郎", amount: 30000, date: "2024-01-13", message: "", projectId: "2" },
  {
    id: "4",
    name: "匿名希望",
    amount: 20000,
    date: "2024-01-12",
    message: "若手医師の育成を支援します",
    projectId: "2",
  },
  {
    id: "5",
    name: "佐藤クリニック",
    amount: 150000,
    date: "2024-01-11",
    message: "地域医療の未来のために",
    projectId: "3",
  },
]
