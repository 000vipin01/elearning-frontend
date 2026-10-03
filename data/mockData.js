// Comprehensive mock dataset for Nexus LMS
export const INITIAL_USERS = [
  // Admin
  {
    id: 'user-admin-1',
    name: 'Dr. Evelyn Vance',
    email: 'admin@elearn.com',
    password: 'admin123',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    title: 'Platform Director & System Administrator',
    bio: 'Oversees academic accreditation, curriculum governance, platform security, and cross-institutional technology partnerships.',
    joinedDate: '2023-11-01',
    status: 'active'
  },

  // Instructors
  {
    id: 'user-inst-1',
    name: 'Prof. David Miller',
    email: 'instructor@elearn.com',
    password: 'instructor123',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    title: 'Distinguished Professor & Enterprise Java Architect',
    bio: 'Former Principal Distributed Systems Engineer at AWS. 16+ years designing enterprise microservices and mentoring thousands of cloud software engineers.',
    expertise: ['Distributed Systems', 'Spring Boot', 'Java Ecosystem', 'Cloud Architecture'],
    joinedDate: '2024-01-15',
    status: 'active',
    rating: 4.92,
    studentsCount: 3240,
    institution: 'Department of Computer Science & Engineering'
  },
  {
    id: 'user-inst-2',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@elearn.com',
    password: 'instructor123',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    title: 'AI Lab Director & Deep Learning Specialist',
    bio: 'Ph.D. in Computer Science from Stanford University. Author of 24 peer-reviewed publications in neural architectures, computer vision, and foundation models.',
    expertise: ['Machine Learning', 'PyTorch', 'Computer Vision', 'Deep Neural Networks'],
    joinedDate: '2024-01-20',
    status: 'active',
    rating: 4.97,
    studentsCount: 4080,
    institution: 'Artificial Intelligence Research Institute'
  },
  {
    id: 'user-inst-3',
    name: 'Marcus Thorne',
    email: 'marcus.thorne@elearn.com',
    password: 'instructor123',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    title: 'Staff Frontend Architect & Design Systems Lead',
    bio: 'Open-source maintainer and former UI Platform Lead at Stripe. Obsessed with high-performance web applications, accessibility, and modern React design patterns.',
    expertise: ['React', 'TypeScript', 'Design Systems', 'Next.js', 'Web Performance'],
    joinedDate: '2024-02-05',
    status: 'active',
    rating: 4.91,
    studentsCount: 2530,
    institution: 'School of Interactive Digital Media'
  },
  {
    id: 'user-inst-4',
    name: 'Dr. Elena Rostova',
    email: 'elena.rostova@elearn.com',
    password: 'instructor123',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    title: 'Distributed Systems & Database Engine Specialist',
    bio: 'Specialist in ACID transactions, consensus algorithms (Raft/Paxos), and high-throughput query optimization engines.',
    expertise: ['PostgreSQL', 'Distributed Databases', 'Raft Consensus', 'Storage Engines'],
    joinedDate: '2024-02-12',
    status: 'active',
    rating: 4.88,
    studentsCount: 1640,
    institution: 'Data Infrastructure Research Center'
  },
  {
    id: 'user-inst-5',
    name: 'Alex Rivera',
    email: 'alex.rivera@elearn.com',
    password: 'instructor123',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    title: 'Principal Cloud Architect & Kubernetes Fellow',
    bio: 'DevOps veteran who led cloud migrations for multi-region fintech architectures. Certified Kubernetes Administrator and Terraform ecosystem contributor.',
    expertise: ['Kubernetes', 'Docker', 'Terraform', 'AWS & Cloud Security', 'CI/CD'],
    joinedDate: '2024-02-28',
    status: 'active',
    rating: 4.89,
    studentsCount: 1890,
    institution: 'Cloud Infrastructure Academy'
  },
  {
    id: 'user-inst-6',
    name: 'Dr. Rajesh Patel',
    email: 'rajesh.patel@elearn.com',
    password: 'instructor123',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    title: 'Algorithms Professor & Competitive Programming Coach',
    bio: 'Coach to ICPC World Finalists and author of acclaimed competitive programming curricula. Specializes in graph algorithms, dynamic programming, and complexity theory.',
    expertise: ['Data Structures', 'Dynamic Programming', 'Graph Theory', 'Algorithm Optimization'],
    joinedDate: '2024-03-01',
    status: 'active',
    rating: 4.96,
    studentsCount: 3150,
    institution: 'Department of Theoretical Computer Science'
  },
  {
    id: 'user-inst-7',
    name: 'Claire Beauchamp',
    email: 'claire.b@elearn.com',
    password: 'instructor123',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    title: 'Offensive Security Lead & Ethical Hacking Consultant',
    bio: 'OSCP, CISSP certified cybersecurity researcher. Specializes in binary exploitation, application security audits, and defensive perimeter engineering.',
    expertise: ['Ethical Hacking', 'OWASP Top 10', 'Penetration Testing', 'Network Security'],
    joinedDate: '2024-03-10',
    status: 'active',
    rating: 4.87,
    studentsCount: 1420,
    institution: 'Cyber Defense Center'
  },
  {
    id: 'user-inst-8',
    name: 'Michael Chang',
    email: 'michael.chang@elearn.com',
    password: 'instructor123',
    role: 'INSTRUCTOR',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    title: 'Staff Systems Architect & Scalability Consultant',
    bio: 'Architect of systems serving 100M+ monthly active users. Frequent keynote speaker on microservices decomposition, caching topologies, and event-driven backbones.',
    expertise: ['System Design', 'Kafka', 'Caching & Redis', 'High Availability'],
    joinedDate: '2024-03-15',
    status: 'active',
    rating: 4.95,
    studentsCount: 3820,
    institution: 'Software Architecture Institute'
  },

  // Primary Demo Student
  {
    id: 'user-stud-1',
    name: 'Alex Morgan',
    email: 'student@elearn.com',
    password: 'student123',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    title: 'Senior Computer Science Undergraduate',
    bio: 'Aspiring backend engineer and distributed systems enthusiast. Preparing for technical interviews and building full-stack applications.',
    joinedDate: '2024-02-01',
    status: 'active',
    major: 'Computer Science & Software Engineering',
    gpa: '3.92'
  },

  // 20 Additional Students for realistic cohort data
  {
    id: 'user-stud-2',
    name: 'Sophia Martinez',
    email: 'sophia.m@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    title: 'Data Science Scholar',
    joinedDate: '2024-02-10',
    status: 'active'
  },
  {
    id: 'user-stud-3',
    name: 'Liam Johnson',
    email: 'liam.j@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    title: 'Cloud & Infrastructure Enthusiast',
    joinedDate: '2024-02-14',
    status: 'active'
  },
  {
    id: 'user-stud-4',
    name: 'Emma Wilson',
    email: 'emma.w@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80',
    title: 'Frontend Engineer',
    joinedDate: '2024-02-18',
    status: 'active'
  },
  {
    id: 'user-stud-5',
    name: 'Noah Davis',
    email: 'noah.d@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    title: 'Machine Learning Student',
    joinedDate: '2024-02-22',
    status: 'active'
  },
  {
    id: 'user-stud-6',
    name: 'Olivia Taylor',
    email: 'olivia.t@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    title: 'Cybersecurity Analyst in training',
    joinedDate: '2024-02-25',
    status: 'active'
  },
  {
    id: 'user-stud-7',
    name: 'Lucas Anderson',
    email: 'lucas.a@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    title: 'Full Stack Developer',
    joinedDate: '2024-03-01',
    status: 'active'
  },
  {
    id: 'user-stud-8',
    name: 'Mia Thomas',
    email: 'mia.t@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    title: 'Database & Systems Student',
    joinedDate: '2024-03-04',
    status: 'active'
  },
  {
    id: 'user-stud-9',
    name: 'Ethan Jackson',
    email: 'ethan.j@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    title: 'Software Engineering Major',
    joinedDate: '2024-03-08',
    status: 'active'
  },
  {
    id: 'user-stud-10',
    name: 'Isabella White',
    email: 'isabella.w@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    title: 'Algorithms & Competitive Coder',
    joinedDate: '2024-03-12',
    status: 'active'
  },
  {
    id: 'user-stud-11',
    name: 'Mason Harris',
    email: 'mason.h@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    title: 'Backend Developer',
    joinedDate: '2024-03-15',
    status: 'active'
  },
  {
    id: 'user-stud-12',
    name: 'Charlotte Martin',
    email: 'charlotte.m@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    title: 'Bioinformatics & Python Fellow',
    joinedDate: '2024-03-18',
    status: 'active'
  },
  {
    id: 'user-stud-13',
    name: 'Oliver Thompson',
    email: 'oliver.t@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    title: 'Security Research Assistant',
    joinedDate: '2024-03-21',
    status: 'active'
  },
  {
    id: 'user-stud-14',
    name: 'Harper Garcia',
    email: 'harper.g@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    title: 'Distributed Systems Explorer',
    joinedDate: '2024-03-25',
    status: 'active'
  },
  {
    id: 'user-stud-15',
    name: 'Elijah Martinez',
    email: 'elijah.m@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80',
    title: 'React & UI Craftsman',
    joinedDate: '2024-03-28',
    status: 'active'
  },
  {
    id: 'user-stud-16',
    name: 'Evelyn Robinson',
    email: 'evelyn.r@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    title: 'Machine Learning Student',
    joinedDate: '2024-04-01',
    status: 'active'
  },
  {
    id: 'user-stud-17',
    name: 'James Clark',
    email: 'james.c@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    title: 'DevOps Trainee',
    joinedDate: '2024-04-05',
    status: 'active'
  },
  {
    id: 'user-stud-18',
    name: 'Amelia Rodriguez',
    email: 'amelia.r@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    title: 'CS & Math Double Major',
    joinedDate: '2024-04-09',
    status: 'active'
  },
  {
    id: 'user-stud-19',
    name: 'Benjamin Lewis',
    email: 'benjamin.l@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    title: 'Enterprise Java Trainee',
    joinedDate: '2024-04-12',
    status: 'active'
  },
  {
    id: 'user-stud-20',
    name: 'Lucas Walker',
    email: 'lucas.w@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    title: 'Network Systems Student',
    joinedDate: '2024-04-15',
    status: 'inactive'
  },
  {
    id: 'user-stud-21',
    name: 'Chloe Bennett',
    email: 'chloe.b@student.edu',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    title: 'Cognitive Computing Student',
    joinedDate: '2024-04-18',
    status: 'active'
  }
];

export const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Software Engineering', slug: 'software-engineering', description: 'Core principles of software design, clean code, design patterns, and OOP architecture.', icon: 'Code', courseCount: 3 },
  { id: 'cat-2', name: 'Computer Science', slug: 'computer-science', description: 'Theoretical foundations, algorithms, data structures, and computational complexity.', icon: 'Cpu', courseCount: 2 },
  { id: 'cat-3', name: 'Web Development', slug: 'web-development', description: 'Modern client-side engineering, responsive frameworks, and distributed web applications.', icon: 'Globe', courseCount: 2 },
  { id: 'cat-4', name: 'Data Science & AI', slug: 'data-science-ai', description: 'Machine learning, statistical analysis, deep neural networks, and computer vision.', icon: 'Brain', courseCount: 2 },
  { id: 'cat-5', name: 'Cloud & DevOps', slug: 'cloud-devops', description: 'Containerization, Kubernetes, infrastructure-as-code, and continuous delivery pipelines.', icon: 'Cloud', courseCount: 1 },
  { id: 'cat-6', name: 'Cybersecurity', slug: 'cybersecurity', description: 'Defensive security, penetration testing, threat modeling, and modern cryptography.', icon: 'Shield', courseCount: 1 },
  { id: 'cat-7', name: 'Databases & Systems', slug: 'databases-systems', description: 'High-throughput database engines, distributed consensus, and transaction isolation.', icon: 'Database', courseCount: 1 }
];

export const INITIAL_COURSES = [
  {
    id: 'course-1',
    title: 'Complete Java Programming: Zero to Production',
    subtitle: 'Master modern Java 21, object-oriented architecture, concurrency, and JVM internals with hands-on projects.',
    category: 'Software Engineering',
    difficulty: 'Beginner',
    duration: '24 hours',
    rating: 4.92,
    reviewsCount: 384,
    studentsCount: 1240,
    instructorId: 'user-inst-1',
    instructorName: 'Prof. David Miller',
    instructorTitle: 'Distinguished Professor & Enterprise Java Architect',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-01-18',
    updatedAt: '2024-03-20',
    tags: ['Java', 'OOP', 'JVM', 'Concurrency', 'Design Patterns'],
    description: 'A comprehensive, rigorous course designed to take you from core programming paradigms to enterprise-grade Java applications. Covers modern syntax, collections, multithreading, and real-world software architecture.',
    whatYouWillLearn: [
      'Master object-oriented programming concepts (polymorphism, encapsulation, inheritance, abstraction)',
      'Understand JVM memory model, garbage collection algorithms, and heap profiling',
      'Leverage Java Streams, lambdas, and modern functional idioms Introduced in Java 17-21',
      'Build concurrent applications using Virtual Threads (Project Loom) and executors',
      'Write robust unit and integration tests using JUnit 5 and Mockito'
    ],
    requirements: [
      'Basic familiarity with computers and code editors',
      'No prior Java knowledge required — we start from absolute fundamentals',
      'JDK 21 installed on your workstation (complete setup guide included)'
    ],
    modules: [
      {
        id: 'mod-1-1',
        title: 'Module 1: Java Foundations & Object-Oriented Principles',
        order: 1,
        duration: '4h 15m',
        lessons: [
          {
            id: 'les-1-1-1',
            title: '1.1 Introduction to the JVM, JRE, and Bytecode Compilation',
            duration: '18 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
            summary: 'Learn how Java source code is compiled into platform-independent bytecode and executed by the Java Virtual Machine.',
            content: `### Understanding the Java Virtual Machine

Java's architectural philosophy is encapsulated in the adage: *"Write Once, Run Anywhere"* (WORA). This portability is made possible by the **Java Virtual Machine (JVM)**.

#### The Execution Lifecycle
1. **Source Code (\`.java\`):** You write high-level, human-readable code.
2. **Bytecode Compilation (\`javac\`):** The compiler converts source files into platform-neutral bytecode (\`.class\` files).
3. **Execution Engine:** The JVM loads classes, verifies bytecode, and uses the **Just-In-Time (JIT) Compiler** to translate critical hot spots directly into native CPU instructions.

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Welcome to High-Performance Java!");
    }
}
\`\`\`

#### Key Takeaway
Unlike languages like C++ that compile directly to host-specific machine binaries, Java bytecode runs inside the managed sandbox of the JVM, providing automated memory management, safety checks, and platform independence.`
          },
          {
            id: 'les-1-1-2',
            title: '1.2 Classes, Objects, and Encapsulation Patterns',
            duration: '24 min',
            type: 'text',
            isPreview: false,
            videoUrl: '',
            summary: 'Deep dive into encapsulation, accessor mutator conventions, and domain entity modeling.',
            content: `### Deep Dive into Object Encapsulation

Encapsulation is the protective barrier that prevents arbitrary outside code from corrupting internal class invariants.

#### Encapsulation Best Practices:
- Keep fields \`private\` by default.
- Expose immutable accessors (\`getters\`) and validated mutators (\`setters\`).
- Prefer constructor-based dependency initialization.

\`\`\`java
public final class BankAccount {
    private final String accountNumber;
    private long balanceInCents;

    public BankAccount(String accountNumber, long initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.accountNumber = accountNumber;
        this.balanceInCents = initialBalance;
    }

    public synchronized void deposit(long amount) {
        if (amount <= 0) throw new IllegalArgumentException("Deposit amount must be positive");
        this.balanceInCents += amount;
    }

    public long getBalanceInCents() {
        return balanceInCents;
    }
}
\`\`\`
`
          },
          {
            id: 'les-1-1-3',
            title: '1.3 Polymorphism, Abstract Classes, and Interfaces',
            duration: '32 min',
            type: 'video',
            isPreview: false,
            videoUrl: 'https://www.youtube.com/embed/grEKMHGYyns',
            summary: 'Explore dynamic method dispatch, default interface methods, and contract-driven design.',
            content: `### Polymorphism and Contract-Driven Design

Polymorphism allows objects of different concrete classes to respond differently to identical method invocations.

#### Comparison: Interface vs Abstract Class
- **Interface:** Defines a pure contractual capability (e.g., \`Comparable\`, \`Serializable\`, \`AutoCloseable\`).
- **Abstract Class:** Provides partial shared behavior and non-public state for tightly related subclasses.`
          }
        ]
      },
      {
        id: 'mod-1-2',
        title: 'Module 2: Advanced Collections & Modern Concurrency',
        order: 2,
        duration: '6h 30m',
        lessons: [
          {
            id: 'les-1-2-1',
            title: '2.1 Java Collections Internals: HashMap, TreeMap & ConcurrentHashMap',
            duration: '28 min',
            type: 'video',
            isPreview: false,
            videoUrl: 'https://www.youtube.com/embed/703TzP_92gI',
            summary: 'Examine hash bucketing, collision resolution, red-black tree conversion, and lock striping.',
            content: `### Internal Mechanics of \`HashMap\`

Underneath, a \`HashMap\` is backed by an array of bucket nodes (\`Node<K,V>[] table\`).

1. **Hash Calculation:** \`hash(key) = (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16)\`
2. **Index Computation:** \`index = hash & (n - 1)\` where $n$ is capacity (power of two).
3. **Collision Handling:** Linked lists are used for collisions. When a bucket surpasses 8 elements (TREEIFY_THRESHOLD), the list converts into a Red-Black Tree for $O(\\log n)$ performance.`
          },
          {
            id: 'les-1-2-2',
            title: '2.2 Virtual Threads & Project Loom in Java 21',
            duration: '35 min',
            type: 'text',
            isPreview: false,
            videoUrl: '',
            summary: 'Learn how Java 21 revolutionizes throughput with millions of lightweight virtual threads.',
            content: `### Virtual Threads: High-Throughput Concurrency

Traditional Java platform threads correspond 1:1 with operating system kernel threads. Creating 10,000 OS threads will exhaust stack memory.

**Virtual Threads** are managed entirely by the JVM runtime, mounting on a small pool of carrier OS threads.

\`\`\`java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
} // Automatic await termination
\`\`\`
`
          }
        ]
      }
    ]
  },

  {
    id: 'course-2',
    title: 'Data Structures & Algorithms: The Technical Interview Blueprint',
    subtitle: 'Comprehensive mastery of algorithms, time-space complexities, and problem-solving patterns for elite engineering roles.',
    category: 'Computer Science',
    difficulty: 'Intermediate',
    duration: '32 hours',
    rating: 4.96,
    reviewsCount: 512,
    studentsCount: 2150,
    instructorId: 'user-inst-6',
    instructorName: 'Dr. Rajesh Patel',
    instructorTitle: 'Algorithms Professor & Competitive Programming Coach',
    instructorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc157585096?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-01-22',
    updatedAt: '2024-03-22',
    tags: ['DSA', 'Algorithms', 'LeetCode', 'Graphs', 'Dynamic Programming'],
    description: 'Designed by an ICPC World Finalist coach, this course systematically breaks down algorithm design patterns: Two Pointers, Sliding Window, Monotonic Stacks, Union-Find, Dijkstra, Topological Sort, and Multi-Dimensional Dynamic Programming.',
    whatYouWillLearn: [
      'Master asymptotic complexity analysis (Big-O, Big-Theta, Amortized bounds)',
      'Implement binary search trees, AVL trees, and Trie data structures from scratch',
      'Solve graph problems using DFS, BFS, Dijkstra, and Tarjan’s strongly connected components',
      'Formulate optimal substructure and state transitions for Dynamic Programming problems',
      'Tackle top tier FAANG-level algorithmic challenges with repeatable systematic patterns'
    ],
    requirements: [
      'Familiarity with at least one programming language (Python, Java, C++, or JavaScript)',
      'Basic understanding of recursion and loops'
    ],
    modules: [
      {
        id: 'mod-2-1',
        title: 'Module 1: Algorithmic Complexity & Pointer Techniques',
        order: 1,
        duration: '5h 45m',
        lessons: [
          {
            id: 'les-2-1-1',
            title: '1.1 Asymptotic Analysis & Master Theorem Demystified',
            duration: '22 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/8hly31xKli0',
            summary: 'Formalize time and space complexity with recurrence relations and the Master Theorem.',
            content: `### Master Theorem for Divide-and-Conquer

Recurrences of the form:
$$T(n) = a \\cdot T\\left(\\frac{n}{b}\\right) + f(n)$$
where $a \\ge 1$ and $b > 1$.

#### Cases:
1. **Case 1:** If $f(n) = O(n^{\\log_b a - \\epsilon})$, then $T(n) = \\Theta(n^{\\log_b a})$.
2. **Case 2:** If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$, then $T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$.
3. **Case 3:** If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ and regularity condition holds, $T(n) = \\Theta(f(n))$.`
          },
          {
            id: 'les-2-1-2',
            title: '1.2 Two-Pointer & Sliding Window Masterclass',
            duration: '34 min',
            type: 'text',
            isPreview: false,
            videoUrl: '',
            summary: 'Learn linear scanning techniques to reduce $O(N^2)$ brute force to $O(N)$ optimal runtimes.',
            content: `### The Sliding Window Invariant

Sliding window algorithms maintain a valid subarray range $[L, R]$ while expanding $R$ and contracting $L$ whenever constraints are violated.

\`\`\`python
def longest_substring_k_distinct(s: str, k: int) -> int:
    char_count = {}
    left = 0
    max_len = 0
    
    for right, char in enumerate(s):
        char_count[char] = char_count.get(char, 0) + 1
        
        while len(char_count) > k:
            left_char = s[left]
            char_count[left_char] -= 1
            if char_count[left_char] == 0:
                del char_count[left_char]
            left += 1
            
        max_len = max(max_len, right - left + 1)
        
    return max_len
\`\`\`
`
          }
        ]
      },
      {
        id: 'mod-2-2',
        title: 'Module 2: Advanced Graph Algorithms & Shortest Path',
        order: 2,
        duration: '8h 20m',
        lessons: [
          {
            id: 'les-2-2-1',
            title: '2.1 Dijkstra’s Algorithm & Priority Queue Implementations',
            duration: '30 min',
            type: 'video',
            isPreview: false,
            videoUrl: 'https://www.youtube.com/embed/EFg3u_E6eHU',
            summary: 'Calculate single-source shortest path on non-negative weighted graphs in $O((V+E) \\log V)$.',
            content: `### Dijkstra's Shortest Path Algorithm

Dijkstra maintains a min-heap of tentative distances. At each step, it visits the unvisited vertex with the minimum distance and relaxes outgoing edges.`
          }
        ]
      }
    ]
  },

  {
    id: 'course-3',
    title: 'Spring Boot & Microservices Backend Architecture',
    subtitle: 'Architect production-grade cloud microservices with Spring Cloud, Docker, Kafka, and PostgreSQL.',
    category: 'Software Engineering',
    difficulty: 'Advanced',
    duration: '28 hours',
    rating: 4.88,
    reviewsCount: 290,
    studentsCount: 980,
    instructorId: 'user-inst-1',
    instructorName: 'Prof. David Miller',
    instructorTitle: 'Distinguished Professor & Enterprise Java Architect',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-24',
    tags: ['Spring Boot', 'Microservices', 'Docker', 'Kafka', 'PostgreSQL'],
    description: 'Build enterprise backends that scale gracefully. Dive into RESTful design, Spring Data JPA, Spring Security with JWT/OAuth2, distributed tracing with OpenTelemetry, and asynchronous event streaming with Apache Kafka.',
    whatYouWillLearn: [
      'Structure clean decoupled microservices using domain-driven design (DDD)',
      'Implement stateless JWT authentication and role-based access control (RBAC)',
      'Design event-driven workflows with Apache Kafka topic partitioning and consumer groups',
      'Implement circuit breakers, rate limiters, and retry policies using Resilience4j',
      'Containerize services with multi-stage Docker builds and Docker Compose orchestration'
    ],
    requirements: [
      'Solid understanding of Java (or completion of Complete Java Programming)',
      'Basic relational database concepts (SQL queries, primary keys, foreign keys)'
    ],
    modules: [
      {
        id: 'mod-3-1',
        title: 'Module 1: Spring Boot Core & REST API Standards',
        order: 1,
        duration: '6h 10m',
        lessons: [
          {
            id: 'les-3-1-1',
            title: '1.1 Dependency Injection & Spring Container Lifecycle',
            duration: '25 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/9SGDpanrc8U',
            summary: 'Understand ApplicationContext, Bean definitions, scopes, and constructor injection.',
            content: `### Spring Inversion of Control (IoC)

The IoC container manages the instantiation, configuration, and assembly of objects called **Spring Beans**.

#### Constructor Injection Recommendation
Constructor injection guarantees required dependencies are non-null and facilitates easier unit testing without reflection.`
          },
          {
            id: 'les-3-1-2',
            title: '1.2 JPA Repositories, Entity Relations, and N+1 Solutions',
            duration: '38 min',
            type: 'text',
            isPreview: false,
            videoUrl: '',
            summary: 'Eliminate lazy loading performance pitfalls using JOIN FETCH and EntityGraphs.',
            content: `### Tackling the N+1 Query Problem

When an entity with a \`@OneToMany\` association is retrieved, Hibernate executes 1 query for the parent and $N$ queries for child collections.

\`\`\`java
@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    @Query("SELECT o FROM Order o JOIN FETCH o.lineItems WHERE o.customer.id = :customerId")
    List<Order> findWithItemsByCustomerId(@Param("customerId") UUID customerId);
}
\`\`\`
`
          }
        ]
      }
    ]
  },

  {
    id: 'course-4',
    title: 'Modern React & Frontend Engineering Masterclass',
    subtitle: 'From advanced hooks and state machines to custom design systems, SSR, and web performance.',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '26 hours',
    rating: 4.93,
    reviewsCount: 442,
    studentsCount: 1890,
    instructorId: 'user-inst-3',
    instructorName: 'Marcus Thorne',
    instructorTitle: 'Staff Frontend Architect & Design Systems Lead',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-02-10',
    updatedAt: '2024-03-25',
    tags: ['React', 'TypeScript', 'Tailwind', 'Performance', 'Hooks'],
    description: 'Learn modern React patterns as practiced by senior frontend engineers at top technology companies. Master concurrent rendering, custom hooks, atomic state, server components, and sub-millisecond interaction design.',
    whatYouWillLearn: [
      'Write rock-solid React components with TypeScript and strict typing',
      'Optimize re-renders using memoization techniques and compound component patterns',
      'Build scalable accessible design systems with Tailwind CSS and Radix primitives',
      'Handle complex server state synchronization with React Query / TanStack',
      'Diagnose web performance bottlenecks using Chrome DevTools Profiler'
    ],
    requirements: [
      'Sound knowledge of modern JavaScript (ES6+), async/await, closures, and promises',
      'Basic familiarity with HTML5 and CSS3'
    ],
    modules: [
      {
        id: 'mod-4-1',
        title: 'Module 1: React Under the Hood & Advanced Hooks',
        order: 1,
        duration: '5h 30m',
        lessons: [
          {
            id: 'les-4-1-1',
            title: '1.1 The Virtual DOM, Fiber Reconciliation & Concurrent Features',
            duration: '26 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/7YhdqIR2Yzo',
            summary: 'How React Fiber splits reconciliation work into interruptible units to maintain 60 FPS responsiveness.',
            content: `### React Fiber Architecture

Prior to React 16, reconciliation was stack-based and synchronous. React Fiber redesigned the internal reconciler into a linked-list tree of work units called fibers.

#### Key Benefits
- Work can be paused, prioritized, aborted, or reused.
- High-priority user input (keystrokes, gestures) takes precedence over background data rendering.`
          },
          {
            id: 'les-4-1-2',
            title: '1.2 Writing Clean Custom Hooks & State Composition',
            duration: '31 min',
            type: 'text',
            isPreview: false,
            videoUrl: '',
            summary: 'Abstract complex asynchronous state and event listeners into reusable hooks.',
            content: `### Custom Hooks: Encapsulating Logic

Hooks extract stateful logic without altering component hierarchy.

\`\`\`tsx
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`
`
          }
        ]
      }
    ]
  },

  {
    id: 'course-5',
    title: 'Database Management Systems & High-Scale SQL/NoSQL',
    subtitle: 'Deep dive into storage engines, B+ Trees, WAL, query execution plans, and distributed partitioning.',
    category: 'Databases & Systems',
    difficulty: 'Intermediate',
    duration: '20 hours',
    rating: 4.85,
    reviewsCount: 210,
    studentsCount: 1120,
    instructorId: 'user-inst-4',
    instructorName: 'Dr. Elena Rostova',
    instructorTitle: 'Distributed Systems & Database Engine Specialist',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-26',
    tags: ['PostgreSQL', 'SQL', 'Indexes', 'B-Tree', 'ACID'],
    description: 'Go beyond basic SQL queries. Understand how database engines persist pages to disk, manage buffer pools, parse ASTs, execute cost-based query plans, and enforce ACID guarantees under heavy concurrent workloads.',
    whatYouWillLearn: [
      'Analyze EXPLAIN ANALYZE execution plans and identify sequential scan bottlenecks',
      'Design compound B+ Tree indexes and understand index covering & selectivity',
      'Master transaction isolation levels (Read Committed, Repeatable Read, Serializable)',
      'Learn how Write-Ahead Logging (WAL) and MVCC prevent data loss and locking overhead',
      'Compare relational storage vs LSM-tree based columnar engines'
    ],
    requirements: [
      'Basic ability to write simple SQL SELECT and JOIN queries',
      'Fundamental understanding of data structures (arrays, trees)'
    ],
    modules: [
      {
        id: 'mod-5-1',
        title: 'Module 1: Relational Storage Internals & Indexing',
        order: 1,
        duration: '4h 50m',
        lessons: [
          {
            id: 'les-5-1-1',
            title: '1.1 The Anatomy of a Database Page & Buffer Pool Manager',
            duration: '25 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/4yP_2s6fE8o',
            summary: 'Examine 8KB PostgreSQL disk pages, slotted page layouts, and cache replacement algorithms.',
            content: `### Database Pages & Disk I/O

Databases do not read individual rows from disk. They read and write blocks of memory called **Pages** (typically 8KB in Postgres).

#### Slotted Page Architecture:
- Page Header: Checksum, free space pointers, LSN.
- Item Id Array: Array of pointers to row offsets.
- Free Space: Expands towards the middle.
- Tuples (Rows): Inserted from the end of the page upward.`
          }
        ]
      }
    ]
  },

  {
    id: 'course-6',
    title: 'Machine Learning & Deep Neural Networks Fundamentals',
    subtitle: 'Mathematical intuition, loss landscapes, backpropagation, and PyTorch implementations from scratch.',
    category: 'Data Science & AI',
    difficulty: 'Advanced',
    duration: '36 hours',
    rating: 4.97,
    reviewsCount: 620,
    studentsCount: 2430,
    instructorId: 'user-inst-2',
    instructorName: 'Dr. Sarah Chen',
    instructorTitle: 'AI Lab Director & Deep Learning Specialist',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-02-18',
    updatedAt: '2024-03-27',
    tags: ['Machine Learning', 'PyTorch', 'Python', 'Neural Networks', 'AI'],
    description: 'A rigorous masterclass uniting mathematical foundations (multivariate calculus, linear algebra, probability) with cutting-edge deep learning implementations in PyTorch.',
    whatYouWillLearn: [
      'Derive and implement analytical backpropagation and gradient descent from scratch',
      'Train deep convolutional networks (CNNs) and transformer self-attention blocks',
      'Prevent overfitting using dropout, weight decay, batch normalization, and data augmentation',
      'Fine-tune pre-trained models using HuggingFace and evaluate F1, ROC-AUC metrics'
    ],
    requirements: [
      'Proficiency in Python programming',
      'College-level calculus (derivatives, partial derivatives) and matrix multiplication'
    ],
    modules: [
      {
        id: 'mod-6-1',
        title: 'Module 1: Foundations of Optimization & Perceptrons',
        order: 1,
        duration: '6h 40m',
        lessons: [
          {
            id: 'les-6-1-1',
            title: '1.1 The Mathematics of Gradient Descent & Computational Graphs',
            duration: '35 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
            summary: 'Reverse-mode automatic differentiation and backpropagation chain rule.',
            content: `### Backpropagation via the Chain Rule

For a loss function $L(y, \\hat{y})$ and intermediate layer activation $z = Wx + b$:

$$\\frac{\\partial L}{\\partial W} = \\frac{\\partial L}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} \\cdot \\frac{\\partial z}{\\partial W}$$

PyTorch dynamically constructs Directed Acyclic Graphs (DAGs) during the forward pass to evaluate these vector-Jacobian products in reverse during \`.backward()\`.`
          }
        ]
      }
    ]
  },

  {
    id: 'course-7',
    title: 'DevOps, Kubernetes & Cloud Engineering on AWS',
    subtitle: 'Production infrastructure automation with Docker, Kubernetes, Terraform, Helm, and GitOps pipelines.',
    category: 'Cloud & DevOps',
    difficulty: 'Advanced',
    duration: '30 hours',
    rating: 4.89,
    reviewsCount: 185,
    studentsCount: 890,
    instructorId: 'user-inst-5',
    instructorName: 'Alex Rivera',
    instructorTitle: 'Principal Cloud Architect & Kubernetes Fellow',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-02-22',
    updatedAt: '2024-03-25',
    tags: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'CI/CD'],
    description: 'Zero to automated production infrastructure. Master declarative infrastructure with Terraform, multi-tenant container orchestration with Kubernetes, Helm chart packaging, and zero-downtime rolling updates.',
    whatYouWillLearn: [
      'Deploy resilient clusters on AWS EKS with autoscaling node groups',
      'Author Terraform modules with remote S3 state and DynamoDB state locking',
      'Configure ingress controllers, SSL termination, and network policies',
      'Implement GitOps workflows using ArgoCD and GitHub Actions'
    ],
    requirements: [
      'Basic familiarity with Linux command line and networking concepts (TCP/IP, DNS, ports)'
    ],
    modules: [
      {
        id: 'mod-7-1',
        title: 'Module 1: Container Runtime & Kubernetes Architecture',
        order: 1,
        duration: '7h 15m',
        lessons: [
          {
            id: 'les-7-1-1',
            title: '1.1 Control Plane Mechanics: API Server, etcd, Scheduler & Kubelet',
            duration: '30 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/X48VuDVv0do',
            summary: 'Explore the internal components that govern Kubernetes cluster health and state.',
            content: `### Anatomy of the Kubernetes Control Plane

The control plane maintains the desired state of your cluster:
- **kube-apiserver:** The JSON-over-HTTP gateway that validates and configures pods, services, replication controllers.
- **etcd:** Distributed, consistent key-value store holding the complete state of the cluster.
- **kube-scheduler:** Watches for unassigned pods and selects healthy worker nodes based on resource requests.`
          }
        ]
      }
    ]
  },

  {
    id: 'course-8',
    title: 'System Design Fundamentals for Scalable Services',
    subtitle: 'Architect platforms serving 100M+ users: caching, load balancing, sharding, and fault tolerance.',
    category: 'Computer Science',
    difficulty: 'Advanced',
    duration: '22 hours',
    rating: 4.95,
    reviewsCount: 780,
    studentsCount: 3100,
    instructorId: 'user-inst-8',
    instructorName: 'Michael Chang',
    instructorTitle: 'Staff Systems Architect & Scalability Consultant',
    instructorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-02-25',
    updatedAt: '2024-03-28',
    tags: ['System Design', 'Scalability', 'Microservices', 'Distributed Systems'],
    description: 'The definitive blueprint for high-scale system design interviews and real-world system architecture. We analyze real architectures: URL shorteners, distributed rate limiters, YouTube video processing, and Uber dispatch systems.',
    whatYouWillLearn: [
      'Design distributed systems respecting the CAP theorem and PACELC trade-offs',
      'Implement multi-tier caching with Redis and Memcached (Cache-Aside, Write-Through)',
      'Design consistent hashing rings to scale stateful services without resharding thundering herds',
      'Architect event-driven pipelines with Apache Kafka, dead-letter queues, and idempotency keys'
    ],
    requirements: [
      'General programming experience and understanding of client-server architecture'
    ],
    modules: [
      {
        id: 'mod-8-1',
        title: 'Module 1: High Availability & Horizontal Scaling',
        order: 1,
        duration: '5h 10m',
        lessons: [
          {
            id: 'les-8-1-1',
            title: '1.1 Consistent Hashing & Distributed Sharding Strategies',
            duration: '28 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/zaRkONvyGr8',
            summary: 'Distribute keys across server clusters with minimal reorganization upon node additions or failures.',
            content: `### Consistent Hashing Ring

In traditional modulo hashing (\`hash(key) % N\`), adding or removing a single node invalidates almost all mappings, causing massive cache misses.

**Consistent hashing** maps both servers and data keys onto a virtual $2^{32}-1$ ring. When a server is added or removed, only $K/N$ keys need relocation on average.`
          }
        ]
      }
    ]
  },

  {
    id: 'course-9',
    title: 'Modern Cybersecurity & Ethical Hacking Defense',
    subtitle: 'Vulnerability assessment, network defense, web application attacks, and modern cryptography.',
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    duration: '25 hours',
    rating: 4.87,
    reviewsCount: 165,
    studentsCount: 760,
    instructorId: 'user-inst-7',
    instructorName: 'Claire Beauchamp',
    instructorTitle: 'Offensive Security Lead & Ethical Hacking Consultant',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-26',
    tags: ['Security', 'Ethical Hacking', 'OWASP', 'Penetration Testing'],
    description: 'Learn offensive techniques to build bulletproof defensive posture. Master SQL injection, Cross-Site Scripting (XSS), Server-Side Request Forgery (SSRF), JWT vulnerabilities, and secure network infrastructure design.',
    whatYouWillLearn: [
      'Identify and remediate OWASP Top 10 vulnerabilities in modern web applications',
      'Perform authenticated and unauthenticated penetration testing on web services',
      'Understand symmetric/asymmetric encryption, PKI certificates, and TLS handshakes'
    ],
    requirements: [
      'Basic knowledge of HTTP protocols and web technologies'
    ],
    modules: [
      {
        id: 'mod-9-1',
        title: 'Module 1: Web Application Security & OWASP Top 10',
        order: 1,
        duration: '6h 00m',
        lessons: [
          {
            id: 'les-9-1-1',
            title: '1.1 Cross-Site Scripting (XSS) & Content Security Policy (CSP)',
            duration: '27 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/EoaDgJVDdlg',
            summary: 'Defeat stored, reflected, and DOM-based XSS attacks with robust contextual sanitization.',
            content: `### Preventing Cross-Site Scripting

XSS occurs when untrusted input is executed as active script in the browser context.

#### Defense Strategies:
1. Contextual output encoding (HTML, JavaScript, Attribute contexts).
2. Strict Content Security Policy (\`Content-Security-Policy: default-src 'self'\`).
3. \`HttpOnly\` cookies to prevent session token theft.`
          }
        ]
      }
    ]
  },

  {
    id: 'course-10',
    title: 'Python for Data Science, Analytics & Automation',
    subtitle: 'Numpy, Pandas, Matplotlib, and automated data pipelines for business intelligence and scientific computing.',
    category: 'Data Science & AI',
    difficulty: 'Beginner',
    duration: '18 hours',
    rating: 4.91,
    reviewsCount: 310,
    studentsCount: 1650,
    instructorId: 'user-inst-2',
    instructorName: 'Dr. Sarah Chen',
    instructorTitle: 'AI Lab Director & Deep Learning Specialist',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-03-05',
    updatedAt: '2024-03-27',
    tags: ['Python', 'Data Science', 'Pandas', 'NumPy', 'Visualization'],
    description: 'Transform raw, messy datasets into clean insights and interactive visual dashboards. Master vectorized operations in NumPy, grouping and aggregation in Pandas, and statistical charting with Seaborn.',
    whatYouWillLearn: [
      'Write idiomatic Python scripts using list comprehensions and generators',
      'Clean, reshape, and merge multi-table datasets with Pandas DataFrames',
      'Perform exploratory data analysis (EDA) and detect anomalies and missing trends'
    ],
    requirements: [
      'No prior programming knowledge required'
    ],
    modules: [
      {
        id: 'mod-10-1',
        title: 'Module 1: Vectorized Numerical Computing with NumPy',
        order: 1,
        duration: '4h 30m',
        lessons: [
          {
            id: 'les-10-1-1',
            title: '1.1 NumPy ndarray Vectorization & Broadcasting Rules',
            duration: '20 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/QUT1VHiLmmI',
            summary: 'Execute high-speed C-optimized numerical operations without slow Python for-loops.',
            content: `### Vectorization & Memory Contiguity

NumPy arrays are stored in contiguous blocks of memory, enabling SIMD (Single Instruction, Multiple Data) CPU vectorization for 100x performance gains over native Python lists.`
          }
        ]
      }
    ]
  },

  {
    id: 'course-11',
    title: 'Full Stack GraphQL & Next.js Architecture',
    subtitle: 'Unified API schemas, Apollo Federation, React Server Components, and Edge caching.',
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '21 hours',
    rating: 4.82,
    reviewsCount: 140,
    studentsCount: 640,
    instructorId: 'user-inst-3',
    instructorName: 'Marcus Thorne',
    instructorTitle: 'Staff Frontend Architect & Design Systems Lead',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=800&auto=format&fit=crop&q=80',
    published: false,
    status: 'draft',
    moderationStatus: 'pending',
    createdAt: '2024-03-12',
    updatedAt: '2024-03-28',
    tags: ['GraphQL', 'Next.js', 'Apollo', 'FullStack', 'Edge'],
    description: 'An advanced draft curriculum exploring schema-first development, GraphQL subscriptions over WebSockets, and sub-graph federation.',
    whatYouWillLearn: [
      'Design modular GraphQL schemas with type safety across client and server',
      'Optimize cache hits and prevent over-fetching with DataLoader batches'
    ],
    requirements: [
      'Solid React and Node.js knowledge'
    ],
    modules: []
  },

  {
    id: 'course-12',
    title: 'Distributed Consensus & High Availability Systems',
    subtitle: 'Raft consensus, Paxos protocol, vector clocks, split-brain resolution, and quorum replication.',
    category: 'Databases & Systems',
    difficulty: 'Advanced',
    duration: '27 hours',
    rating: 4.96,
    reviewsCount: 95,
    studentsCount: 520,
    instructorId: 'user-inst-4',
    instructorName: 'Dr. Elena Rostova',
    instructorTitle: 'Distributed Systems & Database Engine Specialist',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    published: true,
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-03-14',
    updatedAt: '2024-03-29',
    tags: ['Raft', 'Paxos', 'Distributed Systems', 'Consensus'],
    description: 'Master the theory and implementation of fault-tolerant distributed consensus protocols powering etcd, ZooKeeper, CockroachDB, and Kafka KRaft.',
    whatYouWillLearn: [
      'Implement Raft leader election, log replication, and safety invariants',
      'Solve network partitions, split-brain scenarios, and quorum calculations'
    ],
    requirements: [
      'Advanced systems programming background and concurrency concepts'
    ],
    modules: [
      {
        id: 'mod-12-1',
        title: 'Module 1: The Consensus Problem & Raft State Machine',
        order: 1,
        duration: '5h 15m',
        lessons: [
          {
            id: 'les-12-1-1',
            title: '1.1 Leader Election, Heartbeats, and Randomized Timers',
            duration: '30 min',
            type: 'video',
            isPreview: true,
            videoUrl: 'https://www.youtube.com/embed/vYp4LYbnnW8',
            summary: 'How randomized election timeouts prevent split-vote deadlocks in Raft clusters.',
            content: `### Raft Leader Election

Nodes in Raft exist in one of three states:
1. **Follower:** Responds to incoming RPCs from leaders and candidates.
2. **Candidate:** Requests votes when election timeout elapses.
3. **Leader:** Handles client requests and replicates log entries.`
          }
        ]
      }
    ]
  }
];

export const INITIAL_ENROLLMENTS = [
  // Student Alex Morgan enrollments
  {
    id: 'enr-1',
    userId: 'user-stud-1',
    courseId: 'course-1',
    enrolledAt: '2024-02-15T10:30:00Z',
    status: 'active',
    progressPercentage: 60,
    completedLessons: ['les-1-1-1', 'les-1-1-2'],
    lastAccessedLessonId: 'les-1-1-3',
    lastAccessedAt: '2024-04-01T14:20:00Z'
  },
  {
    id: 'enr-2',
    userId: 'user-stud-1',
    courseId: 'course-2',
    enrolledAt: '2024-02-20T09:15:00Z',
    status: 'active',
    progressPercentage: 33,
    completedLessons: ['les-2-1-1'],
    lastAccessedLessonId: 'les-2-1-2',
    lastAccessedAt: '2024-03-30T18:45:00Z'
  },
  {
    id: 'enr-3',
    userId: 'user-stud-1',
    courseId: 'course-4',
    enrolledAt: '2024-03-01T11:00:00Z',
    status: 'completed',
    progressPercentage: 100,
    completedLessons: ['les-4-1-1', 'les-4-1-2'],
    lastAccessedLessonId: 'les-4-1-2',
    lastAccessedAt: '2024-03-29T16:10:00Z',
    completedAt: '2024-03-29T16:10:00Z'
  },
  {
    id: 'enr-4',
    userId: 'user-stud-1',
    courseId: 'course-8',
    enrolledAt: '2024-03-10T16:00:00Z',
    status: 'active',
    progressPercentage: 100,
    completedLessons: ['les-8-1-1'],
    lastAccessedLessonId: 'les-8-1-1',
    lastAccessedAt: '2024-04-02T19:00:00Z',
    completedAt: '2024-04-02T19:00:00Z'
  },

  // Additional student enrollments for realistic metrics
  { id: 'enr-5', userId: 'user-stud-2', courseId: 'course-1', enrolledAt: '2024-02-18T10:00:00Z', status: 'active', progressPercentage: 80, completedLessons: ['les-1-1-1', 'les-1-1-2'] },
  { id: 'enr-6', userId: 'user-stud-3', courseId: 'course-1', enrolledAt: '2024-02-22T14:00:00Z', status: 'active', progressPercentage: 40, completedLessons: ['les-1-1-1'] },
  { id: 'enr-7', userId: 'user-stud-4', courseId: 'course-3', enrolledAt: '2024-02-25T11:00:00Z', status: 'active', progressPercentage: 50, completedLessons: ['les-3-1-1'] },
  { id: 'enr-8', userId: 'user-stud-5', courseId: 'course-6', enrolledAt: '2024-03-01T08:00:00Z', status: 'active', progressPercentage: 70, completedLessons: ['les-6-1-1'] },
  { id: 'enr-9', userId: 'user-stud-6', courseId: 'course-7', enrolledAt: '2024-03-05T12:00:00Z', status: 'active', progressPercentage: 100, completedLessons: ['les-7-1-1'], completedAt: '2024-03-25T14:00:00Z' },
  { id: 'enr-10', userId: 'user-stud-7', courseId: 'course-2', enrolledAt: '2024-03-07T15:00:00Z', status: 'active', progressPercentage: 66, completedLessons: ['les-2-1-1', 'les-2-1-2'] },
  { id: 'enr-11', userId: 'user-stud-8', courseId: 'course-5', enrolledAt: '2024-03-10T16:00:00Z', status: 'active', progressPercentage: 100, completedLessons: ['les-5-1-1'], completedAt: '2024-03-28T10:00:00Z' },
  { id: 'enr-12', userId: 'user-stud-9', courseId: 'course-1', enrolledAt: '2024-03-12T17:00:00Z', status: 'active', progressPercentage: 20, completedLessons: [] },
  { id: 'enr-13', userId: 'user-stud-10', courseId: 'course-2', enrolledAt: '2024-03-15T09:00:00Z', status: 'active', progressPercentage: 90, completedLessons: ['les-2-1-1', 'les-2-1-2'] },
  { id: 'enr-14', userId: 'user-stud-11', courseId: 'course-3', enrolledAt: '2024-03-18T13:00:00Z', status: 'active', progressPercentage: 60, completedLessons: ['les-3-1-1'] },
  { id: 'enr-15', userId: 'user-stud-12', courseId: 'course-10', enrolledAt: '2024-03-20T11:00:00Z', status: 'active', progressPercentage: 100, completedLessons: ['les-10-1-1'], completedAt: '2024-03-31T15:00:00Z' },
  { id: 'enr-16', userId: 'user-stud-13', courseId: 'course-9', enrolledAt: '2024-03-22T14:30:00Z', status: 'active', progressPercentage: 45, completedLessons: [] },
  { id: 'enr-17', userId: 'user-stud-14', courseId: 'course-12', enrolledAt: '2024-03-24T18:00:00Z', status: 'active', progressPercentage: 80, completedLessons: ['les-12-1-1'] },
  { id: 'enr-18', userId: 'user-stud-15', courseId: 'course-4', enrolledAt: '2024-03-26T10:00:00Z', status: 'active', progressPercentage: 55, completedLessons: ['les-4-1-1'] },
  { id: 'enr-19', userId: 'user-stud-16', courseId: 'course-6', enrolledAt: '2024-03-28T09:30:00Z', status: 'active', progressPercentage: 30, completedLessons: [] },
  { id: 'enr-20', userId: 'user-stud-17', courseId: 'course-7', enrolledAt: '2024-03-29T16:45:00Z', status: 'active', progressPercentage: 65, completedLessons: ['les-7-1-1'] }
];

export const INITIAL_ACTIVITY_LOGS = [
  { id: 'act-1', timestamp: '2024-04-02T19:00:00Z', user: 'Alex Morgan', role: 'STUDENT', action: 'Completed Course', details: 'Completed all required lessons in System Design Fundamentals for Scalable Services', type: 'success' },
  { id: 'act-2', timestamp: '2024-04-02T14:20:00Z', user: 'Alex Morgan', role: 'STUDENT', action: 'Lesson Finished', details: 'Completed lesson 1.2: Classes, Objects, and Encapsulation Patterns', type: 'info' },
  { id: 'act-3', timestamp: '2024-04-02T11:15:00Z', user: 'Prof. David Miller', role: 'INSTRUCTOR', action: 'Course Updated', details: 'Published update to Module 2 of Complete Java Programming', type: 'warning' },
  { id: 'act-4', timestamp: '2024-04-01T16:30:00Z', user: 'Dr. Evelyn Vance', role: 'ADMIN', action: 'User Activated', details: 'Approved academic credentials for instructor Michael Chang', type: 'success' },
  { id: 'act-5', timestamp: '2024-04-01T10:05:00Z', user: 'Sophia Martinez', role: 'STUDENT', action: 'Course Enrolled', details: 'Enrolled in Complete Java Programming: Zero to Production', type: 'info' },
  { id: 'act-6', timestamp: '2024-03-31T17:40:00Z', user: 'Dr. Sarah Chen', role: 'INSTRUCTOR', action: 'Curriculum Published', details: 'Added 2 video lessons to Machine Learning & Deep Neural Networks', type: 'info' },
  { id: 'act-7', timestamp: '2024-03-30T13:25:00Z', user: 'Lucas Walker', role: 'STUDENT', action: 'Account Suspended', details: 'Deactivated due to extended academic leave of absence', type: 'error' },
  { id: 'act-8', timestamp: '2024-03-29T09:12:00Z', user: 'Marcus Thorne', role: 'INSTRUCTOR', action: 'Course Created', details: 'Created draft course: Full Stack GraphQL & Next.js Architecture', type: 'warning' },
  { id: 'act-9', timestamp: '2024-03-28T15:50:00Z', user: 'Dr. Evelyn Vance', role: 'ADMIN', action: 'System Config', details: 'Updated maximum video upload capacity to 500MB', type: 'info' }
];

export const INITIAL_PLATFORM_SETTINGS = {
  platformName: 'NexusLMS Academic & Enterprise',
  academicTerm: 'Spring 2026',
  allowRegistration: true,
  maintenanceMode: false,
  autoApproveInstructors: false,
  requireCourseModeration: true,
  maxUploadSizeMb: 500,
  defaultCourseVisibility: 'published',
  supportEmail: 'support@elearn.com',
  announcementBanner: 'Welcome to the Spring 2026 Academic Session. All advanced computing certifications are now open for enrollment!'
};
