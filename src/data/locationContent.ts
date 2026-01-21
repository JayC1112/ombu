// Unique content for each location page - SEO optimized with 400-700 words per location

export interface LocationContent {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  description: string;
  parking: string;
  landmarks: string[];
  lastSeating: string;
  specialFeatures: string[];
  neighborhoodDescription: string;
  faqs: { question: string; answer: string }[];
}

export const locationContents: Record<string, LocationContent> = {
  midvale: {
    slug: "midvale",
    seoTitle: "All-You-Can-Eat Korean BBQ in Midvale, UT | Ombu Grill",
    seoDescription:
      "Best Korean BBQ in Midvale, Utah. Ombu Grill offers unlimited KBBQ from $16.99. Located on State Street near Fashion Place Mall. 90-minute AYCE, tableside grilling, free parking.",
    h1: "All-You-Can-Eat Korean BBQ & Hot Pot in Midvale, Utah",
    intro:
      "Welcome to Ombu Grill Midvale, your destination for authentic Korean BBQ in the heart of Salt Lake Valley. Our Midvale location brings the sizzling flavors of Korea to State Street, offering an unforgettable all-you-can-eat dining experience.",
    description: `
      Located on the bustling State Street corridor in Midvale, Ombu Grill has been serving Utah families since 2015. Our Midvale restaurant features spacious seating, modern smokeless grills at every table, and a welcoming atmosphere perfect for family dinners, date nights, and group celebrations.

      What sets our Midvale location apart is its convenient central location in Salt Lake Valley. Whether you're coming from Sandy, Murray, or West Jordan, we're easily accessible from I-15 and I-215. After a day of shopping at Fashion Place Mall or catching a movie at the nearby theaters, stop by for unlimited Korean BBQ that won't break the bank.

      Our all-you-can-eat menu features over 30 premium meats including USDA Prime ribeye, tender bulgogi, crispy samgyupsal (pork belly), and fresh seafood. Every table is equipped with a built-in grill where you cook your meats to perfection—it's interactive dining that brings people together.

      The Midvale community has embraced Ombu Grill as a go-to spot for celebrations. We regularly host birthday parties, graduation dinners, and corporate team outings. Our staff speaks both English and Korean, and we pride ourselves on making every guest feel at home.

      For the best experience, we recommend visiting during lunch hours (11 AM - 3 PM) for our lunch special pricing. Dinner service starts at 3 PM with our full dinner menu. During peak weekend hours, there may be a short wait, but our efficient turnover means you'll be seated quickly.
    `,
    parking: "Free parking lot available directly in front of the restaurant. Additional street parking on State Street.",
    landmarks: [
      "2 miles south of Fashion Place Mall",
      "Near 7000 South TRAX station",
      "Across from Midvale City Park",
      "5 minutes from I-15 Exit 298",
    ],
    lastSeating: "Last seating is 30 minutes before closing (9:30 PM daily).",
    specialFeatures: [
      "Spacious dining room seats 120 guests",
      "Private party room available for groups of 20+",
      "Free WiFi throughout the restaurant",
      "Wheelchair accessible entrance and restrooms",
    ],
    neighborhoodDescription:
      "Midvale is centrally located in Salt Lake Valley, making our restaurant accessible from Sandy, Murray, West Jordan, and South Salt Lake within 10 minutes.",
    faqs: [
      {
        question: "Is there a wait time on weekends at the Midvale location?",
        answer:
          "Weekend dinner hours (5-8 PM) are our busiest times. We recommend arriving early or calling ahead to check wait times. Average wait is 15-30 minutes during peak hours.",
      },
      {
        question: "Does the Midvale location have a private room for parties?",
        answer:
          "Yes! Our Midvale restaurant has a semi-private party room that can accommodate groups of 20-30 guests. Call ahead to reserve for birthdays, corporate events, or special occasions.",
      },
      {
        question: "Is the Midvale Ombu Grill close to Fashion Place Mall?",
        answer:
          "Yes, we're just 2 miles south of Fashion Place Mall on State Street. It's about a 5-minute drive, making us a perfect dinner spot after shopping.",
      },
    ],
  },

  "salt-lake-city": {
    slug: "salt-lake-city",
    seoTitle: "Korean BBQ Salt Lake City | All-You-Can-Eat KBBQ | Ombu Grill",
    seoDescription:
      "Best Korean BBQ in Salt Lake City. Ombu Grill SLC offers unlimited KBBQ from $16.99. Located on State Street near downtown. AYCE meats, tableside grilling, easy parking.",
    h1: "All-You-Can-Eat Korean BBQ & Hot Pot in Salt Lake City, Utah",
    intro:
      "Experience authentic Korean BBQ in the heart of Salt Lake City at Ombu Grill. Our SLC location on State Street brings the vibrant flavors of Korean cuisine to downtown, offering unlimited meats, fresh sides, and an interactive grilling experience.",
    description: `
      Ombu Grill Salt Lake City is our flagship location, proudly serving the capital city's diverse community since 2013. Situated on historic State Street, we've become a beloved destination for University of Utah students, downtown professionals, and families from across the Wasatch Front.

      Our Salt Lake City restaurant captures the energy of urban dining while maintaining the warm, family-friendly atmosphere Ombu Grill is known for. The modern interior features exposed brick accents, ambient lighting, and of course, our signature smokeless BBQ grills at every table.

      Being in Salt Lake City means we serve a wonderfully diverse crowd. You'll find everyone from K-pop fans celebrating comeback releases to business teams hosting client dinners. Our menu caters to all tastes—from traditional Korean BBQ purists who love plain chadol baegi with sesame oil, to adventurous eaters trying beef tongue for the first time.

      The State Street location is particularly popular with the late-night crowd. While our standard hours are 11 AM to 10 PM, the downtown energy keeps us busy well into the evening. We're a favorite post-concert dinner spot for those attending events at The Gateway or Vivint Arena.

      What makes our SLC location special is its accessibility. We're just minutes from downtown hotels, making us a top choice for visitors wanting to experience Utah's Korean food scene. The TRAX light rail stops nearby, and we have a dedicated parking lot so you don't have to fight for street parking.

      Our Salt Lake City team includes several native Korean speakers who can guide you through the menu and share authentic grilling techniques. Ask them about the best meat combinations or how to make the perfect lettuce wrap—they love sharing their culture through food.
    `,
    parking: "Dedicated parking lot behind the restaurant. Street parking also available on State Street (free after 6 PM).",
    landmarks: [
      "10 minutes from downtown Salt Lake City",
      "Near Liberty Park",
      "2 miles from University of Utah",
      "Close to 900 South TRAX station",
    ],
    lastSeating: "Last seating at 9:30 PM. Kitchen closes at 10 PM.",
    specialFeatures: [
      "Late-night friendly for downtown crowds",
      "Near downtown hotels and attractions",
      "Native Korean-speaking staff available",
      "Popular for corporate dining and client entertainment",
    ],
    neighborhoodDescription:
      "Our SLC location serves downtown Salt Lake City, Sugar House, the University of Utah area, and the 9th & 9th neighborhood. Central location with easy TRAX access.",
    faqs: [
      {
        question: "Is Ombu Grill SLC good for a business dinner?",
        answer:
          "Absolutely! Our Salt Lake City location is popular for corporate dinners and client entertainment. The interactive grilling creates a relaxed atmosphere for business conversations. We can accommodate groups and offer quick service for busy professionals.",
      },
      {
        question: "How far is Ombu Grill from downtown Salt Lake City hotels?",
        answer:
          "We're about 10 minutes by car from most downtown hotels. Uber/Lyft rides typically cost $8-12. We're also accessible via TRAX—get off at the 900 South station and walk 5 minutes east.",
      },
      {
        question: "Is the Salt Lake City location open late?",
        answer:
          "We're open until 10 PM daily, with last seating at 9:30 PM. This makes us a great dinner option after downtown events, concerts, or Jazz games at Vivint Arena.",
      },
    ],
  },

  layton: {
    slug: "layton",
    seoTitle: "Korean BBQ Layton Utah | All-You-Can-Eat KBBQ | Ombu Grill",
    seoDescription:
      "Best Korean BBQ in Layton and Davis County. Ombu Grill offers unlimited KBBQ from $16.99. Located on Main Street near Layton Hills Mall. Family-friendly, free parking.",
    h1: "All-You-Can-Eat Korean BBQ & Hot Pot in Layton, Utah",
    intro:
      "Ombu Grill brings authentic Korean BBQ to Davis County! Our Layton location on Main Street is the premier destination for all-you-can-eat Korean cuisine in northern Utah, serving families from Layton, Clearfield, Syracuse, and Farmington.",
    description: `
      When we opened Ombu Grill Layton, we brought something new to Davis County—authentic Korean BBQ with unlimited meats at family-friendly prices. Located on Main Street near Layton Hills Mall, we've quickly become the go-to spot for Korean food north of Salt Lake City.

      The Layton community has embraced us with open arms. We see families celebrating Little League victories, couples on date nights, and friend groups gathering for birthday dinners. Hill Air Force Base personnel are regular guests—we're proud to serve those who serve our country with a taste of Korean hospitality.

      Our Layton restaurant was designed with families in mind. We have booster seats and high chairs available, a kid-friendly menu section, and patient staff who are happy to help first-time Korean BBQ diners learn the ropes. The grills have safety features that make them appropriate for families with children, though we always recommend adult supervision.

      Davis County residents no longer need to drive to Salt Lake for quality Korean BBQ. Everything you'd find at our other locations is here in Layton—premium meats, fresh banchan (side dishes), and that unmistakable sizzle of meat hitting the grill. We source the same quality ingredients and maintain the same standards that have made Ombu Grill Utah's favorite KBBQ chain.

      The Layton location is especially popular on weekends when families are out shopping at Layton Hills Mall or Station Park. We recommend making us your dinner destination after a day of retail therapy. Our lunch specials (11 AM - 3 PM) are also extremely popular with the work-from-home crowd and retirees who appreciate a quieter dining experience.

      Pro tip: If you're coming from Ogden or points north, we're worth the drive. Many guests tell us they pass other restaurants to come to Ombu Grill because the quality and value simply can't be beat.
    `,
    parking: "Large free parking lot available. Additional overflow parking in the shopping center lot.",
    landmarks: [
      "On Main Street near Layton Hills Mall",
      "5 minutes from Station Park",
      "15 minutes from Hill Air Force Base",
      "Easy access from I-15 Exit 332",
    ],
    lastSeating: "Last seating at 9:30 PM daily.",
    specialFeatures: [
      "Family-friendly atmosphere",
      "Popular with Hill AFB personnel",
      "Davis County's only authentic Korean BBQ",
      "Large parking lot for easy access",
    ],
    neighborhoodDescription:
      "Serving Davis County including Layton, Clearfield, Syracuse, Kaysville, Farmington, and Bountiful. The only authentic AYCE Korean BBQ north of Salt Lake City.",
    faqs: [
      {
        question: "Is Ombu Grill Layton good for kids?",
        answer:
          "Yes! Our Layton location is very family-friendly. We have high chairs, booster seats, and kid pricing based on height: Under 40\" is free, 40\" to 50\" is $9.99, and over 50\" is full price. The interactive grilling is fun for kids (with adult supervision), and we have milder options for less adventurous eaters.",
      },
      {
        question: "Do you offer military discounts at the Layton location?",
        answer:
          "We're proud to serve the Hill Air Force Base community. Please ask your server about current promotions for military personnel with valid ID.",
      },
      {
        question: "Is this the only Korean BBQ in Davis County?",
        answer:
          "Ombu Grill Layton is the only authentic all-you-can-eat Korean BBQ restaurant in Davis County. We save residents the drive to Salt Lake City for quality KBBQ.",
      },
    ],
  },

  orem: {
    slug: "orem",
    seoTitle: "Ombu Grill Orem | AYCE Korean BBQ in Orem, UT",
    seoDescription:
      "All-you-can-eat Korean BBQ in Orem, UT. Ombu Grill Orem offers unlimited KBBQ, 90-minute dining limit. Located at 147 N State St. Lunch $17.99, Dinner $26.99. Call (801) 224-6667.",
    h1: "All-You-Can-Eat Korean BBQ in Orem, Utah",
    intro:
      "Ombu Grill Orem brings authentic Korean BBQ to Utah Valley! Located on State Street, we're the top choice for students from BYU and UVU, families in Orem and Provo, and anyone craving unlimited Korean BBQ. KBBQ ONLY - 90-minute dining time limit.",
    description: `
      College students, rejoice! Ombu Grill Orem understands that you want delicious food without emptying your wallet. Our Utah County location has become legendary among BYU and UVU students for offering premium all-you-can-eat Korean BBQ at prices that work with a student budget.

      Located at 147 N State St in Orem, we're perfectly positioned between BYU in Provo and UVU in Orem. Whether you're celebrating the end of finals, hosting a study group reward dinner, or just craving something more exciting than ramen, Ombu Grill delivers an experience that's worth every penny. Please note: Orem is KBBQ ONLY (no hot pot), with a 90-minute dining time limit to ensure everyone gets a chance to enjoy unlimited Korean BBQ.

      The Orem location has a distinctly youthful energy. You'll hear K-pop playing, see friends taking photos of their sizzling meat spreads for Instagram, and witness the competitive eating that inevitably happens when college students discover unlimited food. We love it—the energy is contagious.

      But don't think we're just for students. Utah Valley families have embraced Ombu Grill as a go-to for celebrations. Birthday parties, graduation dinners, missionary farewells, and homecomings all happen at our tables. The interactive nature of Korean BBQ makes it perfect for bringing people together—everyone participates in the cooking, and there's always something to talk about.

      Our Orem team knows the student crowd well. We're used to large groups, split checks, and the occasional "end of semester" celebration that gets a little rowdy (in the best way). We also offer quick lunch service for those with tight class schedules—lunch is $17.99 (11 AM - 3 PM) and dinner is $26.99 (3 PM - 10 PM), making it the best deal in Utah Valley.

      What really sets our Orem location apart is the community we've built. Regular customers become friends, and our staff remembers faces and favorite orders. This isn't just a restaurant—it's a gathering place for Utah Valley's Korean BBQ enthusiasts.

      Planning a group dinner? We can accommodate large parties and even help coordinate ordering for big groups. Just give us a call at (801) 224-6667 ahead of time, and we'll make sure your experience is smooth from start to finish.
    `,
    parking: "Free parking lot on-site. Street parking also available on State Street.",
    landmarks: [
      "On State Street in central Orem",
      "10 minutes from BYU campus",
      "5 minutes from UVU campus",
      "Near University Place Mall",
    ],
    lastSeating: "Last seating at 9:30 PM daily. 90-minute dining time limit.",
    specialFeatures: [
      "KBBQ ONLY (No Hot Pot available)",
      "90-minute dining time limit",
      "Student-friendly pricing: Lunch $17.99, Dinner $26.99",
      "Popular for BYU and UVU students",
      "Large group friendly",
      "Quick lunch service for busy schedules",
    ],
    neighborhoodDescription:
      "Serving Utah County including Orem, Provo, Vineyard, American Fork, and Pleasant Grove. The go-to Korean BBQ for BYU and UVU students.",
    faqs: [
      {
        question: "Does Ombu Grill Orem offer Hot Pot?",
        answer:
          "No, Ombu Grill Orem is KBBQ ONLY. We do not offer hot pot at this location. For hot pot options, visit our South Jordan location (KBBQ + Hot Pot combo) or our South Salt Lake Hot Pot-only location.",
      },
      {
        question: "What is the dining time limit at Orem?",
        answer:
          "Ombu Grill Orem has a 90-minute dining time limit for all-you-can-eat service. This ensures fair access for all guests during busy times.",
      },
      {
        question: "Do you offer student discounts at Ombu Grill Orem?",
        answer:
          "Our lunch pricing ($17.99) is already very student-friendly! We occasionally run promotions during finals week and back-to-school season. Follow us on Instagram for current deals.",
      },
      {
        question: "Can I host a large group dinner for my ward or club?",
        answer:
          "Absolutely! We regularly host large groups from BYU and UVU. For parties of 15+, please call (801) 224-6667 ahead so we can prepare seating and ensure smooth service.",
      },
      {
        question: "How far is Ombu Grill from BYU?",
        answer:
          "We're about 10 minutes from BYU campus, located at 147 N State St in Orem. Easy drive up University Parkway to State Street, with plenty of free parking.",
      },
    ],
  },

  "south-jordan": {
    slug: "south-jordan",
    seoTitle: "Korean BBQ & Hot Pot South Jordan | KBBQ + Hot Pot Combo | Ombu Grill",
    seoDescription:
      "Only location with both Korean BBQ AND Hot Pot! Ombu Grill South Jordan offers KBBQ + Hot Pot combo. Located at The District. Unlimited meats, soup, and sides.",
    h1: "All-You-Can-Eat Korean BBQ & Hot Pot in South Jordan, Utah",
    intro:
      "Ombu Grill South Jordan is our most unique location—the only Ombu where you can enjoy BOTH Korean BBQ AND Hot Pot at the same table! Located at The District in South Jordan, experience the best of both worlds with our exclusive combo option.",
    description: `
      Can't decide between sizzling Korean BBQ and warming Hot Pot? At Ombu Grill South Jordan, you don't have to choose! We're the only location in the Ombu family that offers both Korean BBQ grills AND individual hot pot burners at every table, giving you the ultimate Asian dining experience.

      Our South Jordan restaurant sits in The District, South Jordan's premier shopping and dining destination. The modern space was designed specifically to accommodate our dual-concept menu. Each table features a central BBQ grill surrounded by individual hot pot stations, so everyone can customize their experience.

      Here's how it works: Order our KBBQ + Hot Pot combo (just $5 more than standard KBBQ pricing), and you'll get access to both cooking methods. Start with some sizzling bulgogi on the grill, then dip raw meat and vegetables into your personal pot of simmering broth. It's interactive dining taken to the next level.

      The South Jordan location attracts foodies who want the complete experience. We see Korean BBQ veterans who are trying hot pot for the first time, hot pot lovers discovering the joys of tableside grilling, and adventurous eaters who want to try everything. Our staff is trained to guide you through both cooking methods—just ask!

      Families love our South Jordan restaurant because the combination concept means everyone can eat the way they prefer. Dad wants to grill meat? He's got a grill. Mom prefers the gentler hot pot cooking method? She's got her own pot. Kids want to do both? They can rotate between cooking styles throughout the meal.

      The District location also makes South Jordan Ombu Grill perfect for a full day out. Shop at Scheels, catch a movie at the megaplex, then finish with unlimited Korean BBQ and Hot Pot. It's become a popular date night destination for couples who want more than just dinner—they want an experience.

      Pro tip: The hot pot broths take a few minutes to come to temperature. Order your broth when you sit down, start with some grilled items, and by the time you're ready for round two, your pot will be bubbling and ready for hot pot cooking.
    `,
    parking: "Ample free parking in The District shopping center lot. Closest parking near the restaurant entrance.",
    landmarks: [
      "Located in The District shopping center",
      "Near Scheels and Megaplex Theatre",
      "Easy access from Bangerter Highway",
      "5 minutes from Jordan Landing",
    ],
    lastSeating: "Last seating at 9:30 PM daily.",
    specialFeatures: [
      "ONLY location with both KBBQ and Hot Pot",
      "$5 combo upgrade for both cooking styles",
      "Individual hot pot burners at every seat",
      "Located in premier shopping district",
    ],
    neighborhoodDescription:
      "Serving South Jordan, West Jordan, Herriman, Riverton, and Draper. The only Ombu location offering both Korean BBQ and Hot Pot.",
    faqs: [
      {
        question: "Can everyone at the table do the BBQ + Hot Pot combo?",
        answer:
          "Yes! The $5 upgrade applies per person and gives everyone access to both the grill and their own hot pot burner. You can mix and match throughout your meal.",
      },
      {
        question: "What's the difference between KBBQ and Hot Pot?",
        answer:
          "Korean BBQ means grilling marinated meats on a tabletop grill. Hot Pot means cooking raw ingredients in a pot of simmering broth at your table. Both are all-you-can-eat, and at South Jordan, you can do both!",
      },
      {
        question: "Which hot pot broth is best for beginners?",
        answer:
          "We recommend starting with our Beef Bone Broth (Seolleongtang)—it's rich, mild, and works well with all ingredients. For something with more flavor, try the Miso. Save the Spicy Mala for when you're feeling adventurous!",
      },
    ],
  },

  "south-salt-lake": {
    slug: "south-salt-lake",
    seoTitle: "Hot Pot South Salt Lake | All-You-Can-Eat Hot Pot | Ombu Hotpot",
    seoDescription:
      "Utah's dedicated Hot Pot restaurant! Ombu Hotpot in South Salt Lake offers unlimited AYCE hot pot from $19.99. Late night hours until midnight. Premium broths and ingredients.",
    h1: "All-You-Can-Eat Hot Pot in South Salt Lake, Utah",
    intro:
      "Welcome to Ombu Hotpot, Utah's only dedicated all-you-can-eat Hot Pot restaurant! Our South Salt Lake location specializes exclusively in the art of hot pot, offering premium broths, fresh ingredients, and the best hot pot experience in the state.",
    description: `
      At Ombu Hotpot South Salt Lake, we do one thing and we do it exceptionally well: Hot Pot. Unlike our other locations that focus on Korean BBQ, this restaurant is 100% dedicated to the art of hot pot dining. If you love cooking fresh ingredients in simmering, flavorful broth, this is your paradise.

      Hot pot is the ultimate communal dining experience. Each guest gets their own individual pot of bubbling broth—choose from options like spicy Mala, mild Beef Bone, tangy Kimchi Jjigae, or savory Miso. Then, dip endless rounds of thinly sliced meats, fresh vegetables, noodles, and dumplings into your pot. Cook for seconds, eat, repeat.

      Our South Salt Lake location has quickly become a gathering spot for hot pot enthusiasts. The later hours (we're open until midnight!) make us perfect for late-night cravings, post-work dinners, and those nights when you want a warming meal that lingers. There's something magical about sharing a hot pot meal—it slows you down, encourages conversation, and warms you from the inside out.

      What makes Ombu Hotpot special is our commitment to quality ingredients. We slice our meats fresh daily, source the highest quality beef and lamb, and prepare our broths in-house using traditional recipes. The Spicy Mala broth alone features over 20 spices and takes hours to prepare—you can taste the difference.

      The South Salt Lake neighborhood has embraced us as a late-night dining destination. We attract everyone from hospital workers getting off late shifts to college students looking for a midnight snack to couples on unconventional date nights. The vibe is relaxed and welcoming, no matter what time you walk in.

      Hot pot is also incredibly customizable for dietary needs. Vegetarians can stick to our vegetable broths and endless veggie options. Those avoiding gluten can focus on naturally gluten-free ingredients. Just let your server know about any restrictions, and we'll guide you to the best options.

      First time trying hot pot? Our staff loves introducing newcomers to this style of dining. They'll explain the cooking times for different ingredients, recommend broth and sauce combinations, and make sure you have an amazing first experience. Don't be shy—ask questions!
    `,
    parking: "Street parking available on State Street. Small lot behind the building.",
    landmarks: [
      "On State Street in South Salt Lake",
      "Near the 3300 South area",
      "10 minutes from downtown SLC",
      "Close to Sugar House neighborhood",
    ],
    lastSeating: "Last seating at 11:30 PM (we're open late until midnight!).",
    specialFeatures: [
      "ONLY dedicated Hot Pot location",
      "Open late until MIDNIGHT",
      "Individual hot pot burners for each guest",
      "Extensive broth selection",
    ],
    neighborhoodDescription:
      "Located in South Salt Lake, serving the late-night crowd from downtown SLC, Sugar House, Millcreek, and Murray. Utah's only dedicated AYCE hot pot restaurant.",
    faqs: [
      {
        question: "Is this location Hot Pot only? No Korean BBQ?",
        answer:
          "Correct! Ombu Hotpot South Salt Lake is our dedicated hot pot restaurant. If you want Korean BBQ, visit our other locations. If you want the best hot pot in Utah, you're in the right place!",
      },
      {
        question: "Why are you open so late?",
        answer:
          "Hot pot is perfect for late-night dining—it's warming, social, and relaxing. We stay open until midnight to serve the late-night crowd, shift workers, and anyone craving a hot meal after hours.",
      },
      {
        question: "What's the difference between the broths?",
        answer:
          "Beef Bone is rich and mild. Kimchi Jjigae is tangy with fermented depth. Miso is savory and umami-forward. Spicy Mala has Sichuan peppercorn heat. Most guests choose one broth, but you can always order a side of another to try!",
      },
    ],
  },
};

export function getLocationContent(slug: string): LocationContent | undefined {
  return locationContents[slug];
}
