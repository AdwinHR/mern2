-- Seed data for Portfolio CMS
-- This script populates the database with sample data

-- Insert admin user (password should be hashed in real implementation)
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@adwin.dev', '$2b$10$example_hash_here', 'Adwin H R', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert hero content
INSERT INTO hero_content (name, title, subtitle, description, profile_image_url, resume_url) VALUES
(
    'Adwin H R',
    'Full Stack Developer',
    'Building digital experiences with modern technologies',
    'Passionate developer with expertise in React, Node.js, and cloud technologies. I create scalable web applications that deliver exceptional user experiences.',
    '/images/profile.jpg',
    '/resume.pdf'
)
ON CONFLICT DO NOTHING;

-- Insert about content
INSERT INTO about_content (bio) VALUES
('I''m a passionate full-stack developer with over 5 years of experience in creating web applications. I love turning complex problems into simple, beautiful designs. My journey in technology started during my university years, and I''ve been continuously learning and adapting to new technologies ever since.')
ON CONFLICT DO NOTHING;

-- Insert education data
INSERT INTO education (degree, institution, start_year, end_year, grade, description, sort_order) VALUES
('Bachelor of Computer Science', 'Tech University', 2019, 2023, 'First Class', 'Focused on software engineering, algorithms, and web technologies', 1),
('Full Stack Web Development Bootcamp', 'Code Academy', 2018, 2019, 'Certificate', 'Intensive program covering modern web development stack', 2)
ON CONFLICT DO NOTHING;

-- Insert work experience
INSERT INTO experience (role, company, start_date, end_date, is_current, description, highlights, sort_order) VALUES
(
    'Senior Full Stack Developer',
    'TechCorp Solutions',
    '2023-01-01',
    NULL,
    TRUE,
    'Leading development of enterprise web applications and mentoring junior developers.',
    ARRAY[
        'Led development of microservices architecture serving 100K+ users',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored junior developers and conducted code reviews',
        'Architected scalable solutions using React, Node.js, and AWS'
    ],
    1
),
(
    'Frontend Developer',
    'Digital Agency',
    '2021-06-01',
    '2022-12-31',
    FALSE,
    'Developed responsive web applications and collaborated with design teams.',
    ARRAY[
        'Built responsive web applications using React and TypeScript',
        'Collaborated with design team to implement pixel-perfect UIs',
        'Optimized application performance achieving 95+ Lighthouse scores',
        'Integrated third-party APIs and payment systems'
    ],
    2
),
(
    'Junior Web Developer',
    'StartupXYZ',
    '2020-01-01',
    '2021-05-31',
    FALSE,
    'Started career building web applications and learning modern development practices.',
    ARRAY[
        'Developed and maintained company website using HTML, CSS, JavaScript',
        'Assisted in migration from legacy PHP system to modern React application',
        'Participated in agile development processes and daily standups'
    ],
    3
)
ON CONFLICT DO NOTHING;

-- Insert skill categories
INSERT INTO skill_categories (name, slug, sort_order) VALUES
('Frontend Development', 'frontend', 1),
('Backend Development', 'backend', 2),
('Tools & Technologies', 'tools', 3),
('Databases', 'databases', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert skills
INSERT INTO skills (name, category_id, proficiency_level, sort_order) VALUES
-- Frontend skills
('React', (SELECT id FROM skill_categories WHERE slug = 'frontend'), 5, 1),
('Next.js', (SELECT id FROM skill_categories WHERE slug = 'frontend'), 5, 2),
('TypeScript', (SELECT id FROM skill_categories WHERE slug = 'frontend'), 4, 3),
('JavaScript', (SELECT id FROM skill_categories WHERE slug = 'frontend'), 5, 4),
('Tailwind CSS', (SELECT id FROM skill_categories WHERE slug = 'frontend'), 4, 5),
('Vue.js', (SELECT id FROM skill_categories WHERE slug = 'frontend'), 3, 6),
('HTML5', (SELECT id FROM skill_categories WHERE slug = 'frontend'), 5, 7),
('CSS3', (SELECT id FROM skill_categories WHERE slug = 'frontend'), 5, 8),

-- Backend skills
('Node.js', (SELECT id FROM skill_categories WHERE slug = 'backend'), 5, 1),
('Express.js', (SELECT id FROM skill_categories WHERE slug = 'backend'), 4, 2),
('Python', (SELECT id FROM skill_categories WHERE slug = 'backend'), 4, 3),
('Django', (SELECT id FROM skill_categories WHERE slug = 'backend'), 3, 4),
('REST APIs', (SELECT id FROM skill_categories WHERE slug = 'backend'), 5, 5),
('GraphQL', (SELECT id FROM skill_categories WHERE slug = 'backend'), 3, 6),

-- Tools
('Git', (SELECT id FROM skill_categories WHERE slug = 'tools'), 5, 1),
('Docker', (SELECT id FROM skill_categories WHERE slug = 'tools'), 4, 2),
('AWS', (SELECT id FROM skill_categories WHERE slug = 'tools'), 4, 3),
('Vercel', (SELECT id FROM skill_categories WHERE slug = 'tools'), 4, 4),
('Figma', (SELECT id FROM skill_categories WHERE slug = 'tools'), 3, 5),
('VS Code', (SELECT id FROM skill_categories WHERE slug = 'tools'), 5, 6),

-- Databases
('PostgreSQL', (SELECT id FROM skill_categories WHERE slug = 'databases'), 4, 1),
('MongoDB', (SELECT id FROM skill_categories WHERE slug = 'databases'), 4, 2),
('Redis', (SELECT id FROM skill_categories WHERE slug = 'databases'), 3, 3),
('SQLite', (SELECT id FROM skill_categories WHERE slug = 'databases'), 4, 4)
ON CONFLICT DO NOTHING;

-- Insert projects
INSERT INTO projects (title, description, tech_stack, image_url, live_url, github_url, status, featured, sort_order) VALUES
(
    'E-Commerce Platform',
    'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Features include user authentication, product catalog, shopping cart, order management, and real-time notifications.',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    '/images/projects/ecommerce.jpg',
    'https://ecommerce-demo.adwin.dev',
    'https://github.com/adwin/ecommerce-platform',
    'published',
    TRUE,
    1
),
(
    'Task Management App',
    'Collaborative task management application with real-time updates and team collaboration features. Includes project boards, task assignments, time tracking, and team chat functionality.',
    ARRAY['Next.js', 'Socket.io', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    '/images/projects/taskmanager.jpg',
    'https://tasks.adwin.dev',
    'https://github.com/adwin/task-manager',
    'published',
    TRUE,
    2
),
(
    'Analytics Dashboard',
    'Real-time analytics dashboard with interactive charts and data visualization components. Features custom metrics, exportable reports, and responsive design for mobile and desktop.',
    ARRAY['React', 'D3.js', 'Express', 'Redis', 'Chart.js', 'Material-UI'],
    '/images/projects/analytics.jpg',
    'https://analytics.adwin.dev',
    'https://github.com/adwin/analytics-dashboard',
    'published',
    TRUE,
    3
),
(
    'Weather App',
    'Modern weather application with location-based forecasts, interactive maps, and weather alerts. Includes 7-day forecasts, hourly updates, and beautiful weather animations.',
    ARRAY['Vue.js', 'OpenWeather API', 'Leaflet', 'PWA', 'Service Workers'],
    '/images/projects/weather.jpg',
    'https://weather.adwin.dev',
    'https://github.com/adwin/weather-app',
    'published',
    FALSE,
    4
),
(
    'Portfolio CMS',
    'Content management system for portfolio websites built with React and Strapi. Features include drag-and-drop content editing, media management, and SEO optimization.',
    ARRAY['React', 'Strapi', 'PostgreSQL', 'AWS S3', 'Next.js'],
    '/images/projects/portfolio-cms.jpg',
    NULL,
    'https://github.com/adwin/portfolio-cms',
    'draft',
    FALSE,
    5
)
ON CONFLICT DO NOTHING;

-- Insert contact information
INSERT INTO contact_info (email, phone, github_url, linkedin_url, twitter_url, website_url) VALUES
(
    'adwin@example.com',
    '+1 (555) 123-4567',
    'https://github.com/adwin',
    'https://linkedin.com/in/adwin-hr',
    'https://twitter.com/adwin_dev',
    'https://adwin.dev'
)
ON CONFLICT DO NOTHING;

-- Insert some sample blog posts (optional)
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image_url, status, published_at) VALUES
(
    'Getting Started with Next.js 14',
    'getting-started-nextjs-14',
    'Learn how to build modern web applications with the latest features in Next.js 14, including the App Router and Server Components.',
    'Next.js 14 brings exciting new features that make building web applications even more powerful and efficient. In this post, we''ll explore the key features and how to get started...',
    '/images/blog/nextjs-14.jpg',
    'published',
    '2024-01-15 10:00:00'
),
(
    'Building Scalable APIs with Node.js',
    'scalable-apis-nodejs',
    'Best practices for building robust and scalable REST APIs using Node.js, Express, and modern development patterns.',
    'Building scalable APIs is crucial for modern web applications. In this comprehensive guide, we''ll cover architecture patterns, error handling, authentication, and performance optimization...',
    '/images/blog/nodejs-apis.jpg',
    'published',
    '2024-01-10 14:30:00'
),
(
    'The Future of Web Development',
    'future-web-development',
    'Exploring emerging trends and technologies that will shape the future of web development in 2024 and beyond.',
    'Web development is constantly evolving, with new frameworks, tools, and paradigms emerging regularly. Let''s explore what the future holds...',
    '/images/blog/future-web.jpg',
    'draft',
    NULL
)
ON CONFLICT (slug) DO NOTHING;

-- Update timestamps
UPDATE hero_content SET updated_at = CURRENT_TIMESTAMP;
UPDATE about_content SET updated_at = CURRENT_TIMESTAMP;
UPDATE contact_info SET updated_at = CURRENT_TIMESTAMP;
