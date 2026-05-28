import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@newsportal.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@newsportal.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  const categories = [
    { name: "Politics", slug: "politics", color: "#dc2626" },
    { name: "Technology", slug: "technology", color: "#2563eb" },
    { name: "Business", slug: "business", color: "#059669" },
    { name: "Sports", slug: "sports", color: "#d97706" },
    { name: "Entertainment", slug: "entertainment", color: "#7c3aed" },
    { name: "Health", slug: "health", color: "#0891b2" },
    { name: "Science", slug: "science", color: "#4f46e5" },
    { name: "World", slug: "world", color: "#be123c" },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    createdCategories.push(created);
  }

  const articles = [
    {
      title: "Global Leaders Meet to Discuss Climate Change Initiatives",
      slug: "global-leaders-climate-change-initiatives",
      excerpt:
        "World leaders convened at the United Nations headquarters to discuss new strategies for combating climate change and reducing carbon emissions worldwide.",
      content: `World leaders from over 190 countries gathered at the United Nations headquarters in New York City for a landmark summit on climate change. The three-day conference aimed to establish new, more ambitious targets for reducing greenhouse gas emissions and transitioning to renewable energy sources.

The summit comes at a critical juncture, with recent scientific reports indicating that global temperatures are rising faster than previously projected. UN Secretary-General emphasized the urgency of the situation, stating that "we are running out of time to prevent the most catastrophic effects of climate change."

Key proposals discussed at the summit included a global carbon tax, increased funding for developing nations to transition to clean energy, and stricter regulations on deforestation. Several major economies announced new pledges to achieve carbon neutrality by 2040, a decade earlier than previous commitments.

Environmental groups praised the renewed sense of urgency but cautioned that pledges alone are insufficient without concrete action plans and accountability mechanisms. "We've heard promises before," said one prominent climate activist. "What we need now is implementation and verification."

The conference also highlighted the role of technology in addressing the climate crisis, with several tech companies unveiling new innovations in carbon capture, renewable energy storage, and sustainable agriculture.`,
      imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800",
      published: true,
      featured: true,
      views: 1520,
      categoryId: createdCategories[0].id,
      authorId: admin.id,
    },
    {
      title: "Revolutionary AI System Breaks New Ground in Medical Diagnostics",
      slug: "ai-system-medical-diagnostics-breakthrough",
      excerpt:
        "A new artificial intelligence system has demonstrated unprecedented accuracy in diagnosing rare diseases, potentially transforming healthcare delivery worldwide.",
      content: `Researchers at a leading technology institute have unveiled an artificial intelligence system that can diagnose over 500 rare diseases with accuracy surpassing that of experienced physicians. The system, trained on millions of medical records and imaging data, represents a significant leap forward in AI-assisted healthcare.

The AI system uses a combination of deep learning algorithms and natural language processing to analyze patient symptoms, medical history, and diagnostic images. In clinical trials involving over 10,000 patients, the system achieved a diagnostic accuracy rate of 97.3%, compared to an average of 73.5% for human specialists.

"This technology has the potential to save countless lives, particularly in regions where access to specialist physicians is limited," said the lead researcher. "By providing accurate diagnoses quickly, we can ensure patients receive appropriate treatment sooner."

The system is designed to work alongside healthcare professionals rather than replace them. It provides physicians with detailed diagnostic reports, including confidence levels and recommended follow-up tests, allowing them to make more informed decisions.

Several major hospital networks have already expressed interest in piloting the technology, with deployment expected to begin within the next year. The developers are also working on a simplified version of the system that could be used in mobile health clinics in underserved areas.

Privacy advocates have raised concerns about the handling of sensitive medical data used to train and operate the system. The developers have addressed these concerns by implementing robust data encryption and anonymization protocols, ensuring that patient privacy is maintained throughout the process.`,
      imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
      published: true,
      featured: true,
      views: 2340,
      categoryId: createdCategories[1].id,
      authorId: admin.id,
    },
    {
      title: "Stock Markets Rally as Economic Recovery Gains Momentum",
      slug: "stock-markets-rally-economic-recovery",
      excerpt:
        "Major stock indices reached new highs as economic indicators point to a robust recovery, with unemployment falling and consumer spending rising.",
      content: `Global stock markets surged to record highs this week as a series of positive economic indicators reinforced confidence in the ongoing economic recovery. The S&P 500, Dow Jones Industrial Average, and NASDAQ all posted significant gains, with technology and consumer discretionary sectors leading the advance.

The rally was fueled by several encouraging data points, including a larger-than-expected drop in unemployment claims, strong retail sales figures, and robust manufacturing output. Consumer confidence indices also rose to pre-pandemic levels for the first time.

"The economic fundamentals are stronger than many analysts expected," noted a senior economist at a major investment bank. "We're seeing broad-based growth across multiple sectors, which suggests this recovery has staying power."

Central banks in several major economies have signaled their intention to maintain accommodative monetary policies in the near term, providing additional support for markets. However, some analysts have expressed concern about potential inflationary pressures as demand outpaces supply in certain sectors.

Corporate earnings reports have also exceeded expectations, with a majority of S&P 500 companies reporting revenues and profits above analyst forecasts. Technology companies, in particular, have benefited from the accelerated digital transformation driven by changing work and consumer habits.

Despite the positive outlook, market strategists caution that risks remain, including geopolitical tensions, supply chain disruptions, and the potential for policy missteps by central banks. Investors are advised to maintain diversified portfolios and be prepared for potential volatility in the months ahead.`,
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      published: true,
      featured: false,
      views: 890,
      categoryId: createdCategories[2].id,
      authorId: admin.id,
    },
    {
      title: "Championship Finals: Underdog Team Makes Historic Run",
      slug: "championship-finals-underdog-team-historic-run",
      excerpt:
        "In a stunning turn of events, the lowest-seeded team in the tournament has advanced to the championship finals, captivating fans worldwide.",
      content: `Sports fans around the world are captivated by the remarkable run of an underdog team that has defied all odds to reach the championship finals. The team, which entered the tournament as the lowest seed, has defeated several favorites in dramatic fashion, earning a place in sporting history.

Their journey to the finals included a stunning overtime victory in the quarterfinals and a decisive win against the top-seeded team in the semifinals. The team's success has been attributed to exceptional teamwork, strategic coaching, and the emergence of several previously unknown players who have risen to the occasion.

"This team has shown incredible heart and determination," said the head coach after the semifinal victory. "Every player has bought into our system and given everything they have. We're not done yet."

The championship finals are set to begin this weekend, with the underdog team facing a formidable opponent that has dominated the league throughout the regular season. Despite being heavy underdogs, the team's supporters are confident that the magic run can continue.

Ticket prices for the finals have skyrocketed, with demand far exceeding supply. Television viewership for the team's games has broken records, with millions of casual fans tuning in to witness what could be one of the greatest upsets in sporting history.

Sports analysts have drawn comparisons to other famous underdog stories, noting that such narratives are what make sports compelling. "This is why we watch," said one commentator. "You can't script moments like these."`,
      imageUrl: "https://images.unsplash.com/photo-1461896836934-bd45ba8a0a3c?w=800",
      published: true,
      featured: false,
      views: 3100,
      categoryId: createdCategories[3].id,
      authorId: admin.id,
    },
    {
      title: "Breakthrough in Quantum Computing Promises New Era of Technology",
      slug: "quantum-computing-breakthrough-new-era",
      excerpt:
        "Scientists achieve a major milestone in quantum computing, demonstrating a system that can solve problems previously thought impossible for classical computers.",
      content: `A team of physicists and computer scientists has achieved a groundbreaking milestone in quantum computing, demonstrating a quantum processor capable of solving complex optimization problems millions of times faster than the most powerful classical supercomputers.

The new quantum system, which utilizes a novel approach to error correction, maintains quantum coherence for significantly longer periods than previous systems. This advancement addresses one of the primary challenges that has limited the practical applications of quantum computing.

"This represents a paradigm shift in computing capability," explained the project lead. "Problems that would take classical computers thousands of years to solve can now be addressed in minutes. The implications for drug discovery, materials science, cryptography, and artificial intelligence are profound."

The breakthrough builds on decades of research in quantum physics and engineering. The team developed new superconducting qubits that are more stable and less prone to errors than previous designs, allowing for more complex calculations to be performed reliably.

Industry leaders have quickly recognized the significance of the achievement. Several major technology companies have announced increased investment in quantum computing research, and governments around the world are establishing new initiatives to develop quantum technologies.

However, experts caution that widespread commercial applications of quantum computing are still several years away. Significant engineering challenges remain, including scaling up the number of qubits, improving error rates further, and developing the software ecosystem needed to harness quantum computing power effectively.`,
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
      published: true,
      featured: true,
      views: 1780,
      categoryId: createdCategories[6].id,
      authorId: admin.id,
    },
    {
      title: "New Study Reveals Benefits of Mediterranean Diet for Heart Health",
      slug: "mediterranean-diet-heart-health-study",
      excerpt:
        "A comprehensive study confirms that the Mediterranean diet significantly reduces the risk of heart disease and improves overall cardiovascular health.",
      content: `A landmark study published in a leading medical journal has provided the most comprehensive evidence yet that the Mediterranean diet significantly reduces the risk of heart disease and improves overall cardiovascular health. The study followed over 25,000 participants across multiple countries over a period of 12 years.

Participants who closely adhered to the Mediterranean diet, rich in olive oil, nuts, fruits, vegetables, whole grains, and fish, showed a 30% reduction in the risk of major cardiovascular events compared to those following a standard Western diet. The benefits were consistent across different age groups, genders, and ethnic backgrounds.

"These findings reinforce what we've long suspected about the protective effects of the Mediterranean diet," said the study's principal investigator. "The combination of healthy fats, antioxidants, and anti-inflammatory compounds in this dietary pattern creates a powerful shield against heart disease."

The study also found that the Mediterranean diet was associated with improvements in blood pressure, cholesterol levels, blood sugar control, and body weight. Participants reported higher levels of energy and overall well-being compared to control groups.

Nutritionists have praised the study for its rigorous methodology and large sample size, noting that it provides actionable guidance for individuals looking to improve their heart health through dietary changes. "This isn't about extreme restriction or complicated meal plans," one dietitian explained. "It's about embracing delicious, whole foods that happen to be incredibly good for you."

Public health officials are now considering incorporating the study's findings into updated dietary guidelines, potentially shifting national nutrition recommendations toward a more Mediterranean-inspired approach.`,
      imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
      published: true,
      featured: false,
      views: 1250,
      categoryId: createdCategories[5].id,
      authorId: admin.id,
    },
    {
      title: "Blockbuster Film Shatters Box Office Records Worldwide",
      slug: "blockbuster-film-box-office-records",
      excerpt:
        "The latest installment in a beloved franchise has broken multiple box office records, becoming the fastest film to reach $1 billion in global earnings.",
      content: `The latest installment in one of cinema's most beloved franchises has shattered box office records worldwide, becoming the fastest film in history to reach $1 billion in global earnings. The film achieved this milestone in just 10 days, surpassing the previous record by a full three days.

The film opened to massive audiences across all major markets, with particularly strong performances in North America, China, and Europe. Opening weekend totals exceeded analyst predictions by a significant margin, with many theaters adding extra screenings to meet unprecedented demand.

Critics have praised the film for its spectacular visual effects, compelling storytelling, and strong performances from both returning cast members and newcomers to the franchise. The film currently holds a high approval rating on major review aggregators, making it both a critical and commercial success.

"This film represents the culmination of over a decade of storytelling," said the director at the film's premiere. "We wanted to deliver something that would satisfy longtime fans while also being accessible to newcomers. The response has been beyond our wildest expectations."

The success of the film has had a ripple effect across the entertainment industry, boosting cinema attendance overall and providing a significant revenue boost to theater chains that have struggled in recent years. Merchandise sales tied to the film have also set records, with certain items selling out within hours of becoming available.

Industry analysts predict that the film could ultimately gross over $2.5 billion worldwide, which would place it among the highest-grossing films of all time. The studio has already confirmed that additional installments are in development.`,
      imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
      published: true,
      featured: false,
      views: 4200,
      categoryId: createdCategories[4].id,
      authorId: admin.id,
    },
    {
      title: "International Space Station Celebrates 25 Years of Continuous Habitation",
      slug: "iss-25-years-continuous-habitation",
      excerpt:
        "The International Space Station marks a quarter century of uninterrupted human presence in space, a testament to international cooperation in scientific exploration.",
      content: `The International Space Station (ISS) has reached a remarkable milestone: 25 years of continuous human habitation. Since the first crew arrived in November 2000, the orbital laboratory has been home to astronauts and cosmonauts from 20 different countries, conducting thousands of scientific experiments in the unique microgravity environment.

The anniversary was celebrated with special events both aboard the station and on the ground, with current and former crew members reflecting on the significance of this achievement. "The ISS represents the best of what humanity can achieve when we work together," said one veteran astronaut who completed three tours aboard the station.

Over its 25-year inhabited history, the ISS has hosted more than 270 individuals from 21 countries, who have conducted over 3,000 scientific experiments spanning biology, physics, medicine, and Earth science. Research conducted on the station has led to advances in water purification, medical treatments, and materials science that have benefited life on Earth.

The station has also served as a crucial testbed for technologies needed for future deep-space exploration, including life support systems, exercise protocols to combat the effects of microgravity, and techniques for growing food in space. These developments are considered essential for planned missions to the Moon and Mars.

Looking ahead, space agencies are planning for the eventual decommissioning of the ISS, with commercial space stations expected to take over as platforms for research and tourism in low Earth orbit. The legacy of the ISS, however, will endure as one of the greatest engineering and diplomatic achievements in human history.`,
      imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
      published: true,
      featured: false,
      views: 980,
      categoryId: createdCategories[6].id,
      authorId: admin.id,
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }

  console.log("Database seeded successfully!");
  console.log("Admin credentials:");
  console.log("  Email: admin@newsportal.com");
  console.log("  Password: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
