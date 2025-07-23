import { Article, Category } from '../types/Article';

export const categories: Category[] = [
  { id: '1', name: 'All', slug: 'all' },
  { id: '2', name: 'Technology', slug: 'technology' },
  { id: '3', name: 'Business', slug: 'business' },
  { id: '4', name: 'Sports', slug: 'sports' },
  { id: '5', name: 'Entertainment', slug: 'entertainment' },
  { id: '6', name: 'Science', slug: 'science' },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Revolutionary AI Breakthrough Changes Everything We Know About Machine Learning',
    excerpt: 'Scientists at leading tech companies have discovered a new approach to artificial intelligence that could revolutionize how machines learn and adapt.',
    content: `
      <p>In a groundbreaking development that could reshape the future of artificial intelligence, researchers have unveiled a revolutionary new approach to machine learning that promises to dramatically improve AI capabilities while reducing computational requirements.</p>
      
      <p>The breakthrough, developed through collaboration between leading technology companies and academic institutions, introduces a novel neural network architecture that can learn and adapt more efficiently than traditional models.</p>
      
      <p>"This represents a fundamental shift in how we think about AI," said Dr. Sarah Chen, lead researcher on the project. "We're not just making incremental improvements – we're opening up entirely new possibilities for what AI can achieve."</p>
      
      <p>The new approach addresses several key limitations of current AI systems, including their need for massive amounts of training data and computational power. Early tests suggest that the new models can achieve similar or better performance while using up to 70% less energy.</p>
      
      <p>Industry experts believe this breakthrough could accelerate AI adoption across various sectors, from healthcare and finance to autonomous vehicles and robotics. The technology is expected to be available for commercial use within the next two years.</p>
    `,
    author: 'Alex Thompson',
    publishedAt: '2025-01-10T08:00:00Z',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    tags: ['AI', 'Machine Learning', 'Innovation'],
    status: 'published',
    readTime: 4,
    featured: true
  },
  {
    id: '2',
    title: 'Global Markets Surge as Economic Indicators Show Strong Recovery',
    excerpt: 'Stock markets worldwide posted significant gains following the release of positive economic data that suggests a robust recovery is underway.',
    content: `
      <p>Global financial markets experienced their strongest performance in months as key economic indicators pointed to a sustained recovery across major economies. The positive momentum was driven by better-than-expected employment figures and consumer spending data.</p>
      
      <p>Major stock indices saw substantial gains, with technology and healthcare sectors leading the rally. The positive sentiment was further boosted by central bank statements indicating continued support for economic growth.</p>
      
      <p>Market analysts are optimistic about the trajectory, though they caution that challenges remain in certain sectors. The recovery appears to be broad-based, with both developed and emerging markets participating in the upward trend.</p>
    `,
    author: 'Maria Rodriguez',
    publishedAt: '2025-01-10T06:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Business',
    tags: ['Markets', 'Economy', 'Finance'],
    status: 'published',
    readTime: 3,
    featured: false
  },
  {
    id: '3',
    title: 'Championship Finals Set as Underdogs Defeat Favorites in Stunning Upset',
    excerpt: 'In one of the biggest upsets of the season, the underdog team secured their spot in the championship finals with a thrilling victory.',
    content: `
      <p>In a game that will be remembered for years to come, the tournament's biggest underdogs pulled off a stunning upset to secure their place in the championship finals. The victory came after a hard-fought battle that went into overtime.</p>
      
      <p>The winning team, led by their star player who scored 28 points, overcame a 15-point deficit in the fourth quarter to force overtime. Their resilience and determination were evident throughout the comeback.</p>
      
      <p>Fans packed the arena and witnessed one of the most exciting games of the season. The atmosphere was electric as the underdog team completed their remarkable journey to the finals.</p>
    `,
    author: 'James Wilson',
    publishedAt: '2025-01-09T22:15:00Z',
    imageUrl: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Sports',
    tags: ['Basketball', 'Championship', 'Upset'],
    status: 'published',
    readTime: 2,
    featured: false
  },
  {
    id: '4',
    title: 'Scientists Discover New Species in Deep Ocean Expedition',
    excerpt: 'Marine biologists have identified several previously unknown species during a recent deep-sea exploration mission in the Pacific Ocean.',
    content: `
      <p>A groundbreaking deep-sea expedition has yielded remarkable discoveries, with marine biologists identifying multiple new species in the largely unexplored depths of the Pacific Ocean.</p>
      
      <p>The research team, using advanced submersible technology, explored depths of over 4,000 meters where they encountered unique ecosystems that have remained isolated for millions of years.</p>
      
      <p>Among the discoveries are several new species of fish, crustaceans, and other marine life forms that have adapted to the extreme conditions of the deep ocean. These findings provide valuable insights into evolution and biodiversity.</p>
    `,
    author: 'Dr. Emily Foster',
    publishedAt: '2025-01-09T14:20:00Z',
    imageUrl: 'https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Science',
    tags: ['Marine Biology', 'Discovery', 'Ocean'],
    status: 'published',
    readTime: 3,
    featured: true
  },
  {
    id: '5',
    title: 'Streaming Wars Heat Up with New Platform Launch',
    excerpt: 'The entertainment industry sees another major player enter the streaming market with exclusive content and competitive pricing.',
    content: `
      <p>The streaming landscape became even more competitive with the launch of a new platform that promises to shake up the industry with its unique content strategy and innovative features.</p>
      
      <p>The new service enters a crowded market but brings several advantages, including exclusive partnerships with major studios and a focus on interactive content that allows viewers to influence storylines.</p>
      
      <p>Industry analysts predict that the streaming wars will intensify as platforms compete for subscribers in an increasingly saturated market. The success of this new entrant will likely depend on its ability to differentiate itself from established competitors.</p>
    `,
    author: 'Lisa Chen',
    publishedAt: '2025-01-09T11:45:00Z',
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Entertainment',
    tags: ['Streaming', 'Entertainment', 'Technology'],
    status: 'published',
    readTime: 3,
    featured: false
  },
  {
    id: '6',
    title: 'Upcoming Tech Conference to Feature Major Announcements',
    excerpt: 'Industry leaders prepare for what promises to be one of the most significant technology conferences of the year.',
    content: `
      <p>The tech industry is buzzing with anticipation as major companies prepare to unveil their latest innovations at the upcoming technology conference. Early indications suggest several groundbreaking announcements are planned.</p>
      
      <p>This year's event is expected to focus heavily on artificial intelligence, sustainable technology, and the future of work. Major tech CEOs are scheduled to deliver keynote presentations that could shape industry trends for years to come.</p>
      
      <p>Attendees and industry watchers are particularly excited about rumored product launches and strategic partnerships that could be announced during the three-day event.</p>
    `,
    author: 'Michael Chang',
    publishedAt: '2025-01-08T16:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    tags: ['Conference', 'Innovation', 'AI'],
    status: 'draft',
    readTime: 2,
    featured: false
  }
];