import prisma from "../lib/prisma";

/**
 * Mark specific locations as "Jammu & Kashmir" state
 * Run with: npx tsx scripts/mark-jk-locations.ts
 */

const JK_LOCATIONS = [
  "Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore", "Pulwama", "Budgam", "Kupwara", "Rajouri", "Poonch",
  "Kathua", "Udhampur", "Ramban", "Kishtwar", "Doda", "Shopian", "Kulgam", "Bandipora", "Ganderbal", "Reasi",
  "Samba", "Leh (J&K)", "Gulmarg", "Pahalgam", "Sonamarg", "Patnitop", "Vaishno Devi", "Nathatop", "Banihal", "Bhaderwah",
  "Chenani", "Ramnagar (J&K)", "Akhnoor", "RS Pura", "Hiranagar", "Bishnah", "Marh", "Suchetgarh", "Vijaypur", "Samba City",
  "Nowshera", "Sunderbani", "Kalakote", "Mendhar", "Surankote", "Mandi (J&K)", "Haveli", "Thanna Mandi", "Darhal", "Budhal",
  "Manjakote", "Behrote", "Kotranka", "Ukhral", "Gulabgarh", "Bhadarwah", "Padder", "Marwah", "Warwan", "Chatroo",
  "Zainapora", "Keller", "Hirpora", "Hermain", "Newa", "Bijbehara", "Verinag", "Dooru", "Kokernag", "Pahalgam East",
  "Mattan", "Qazigund", "Seer Hamdan", "Shangus", "Breng Valley", "Naidkhai", "Sumbal", "Bandipora Town", "Hajin", "Tulail",
  "Gurez", "Lolab", "Handwara", "Langate", "Sogam", "Karnah", "Tangdhar", "Uri", "Boniyar", "Wagoora",
  "Magam", "Chadoora", "Narbal", "Pampore", "Kakapora", "Tral", "Awantipora", "Lassipora", "Zainakote", "Nowpora",
  "Wanpoh", "Khrew", "Batamaloo", "Rajbagh", "Lal Chowk", "Dalgate", "Hazratbal", "Soura", "Bemina", "Panthachowk",
  "Zakura", "Khonmoh", "Pantha Chowk", "Sanat Nagar", "Rangreth", "Humhama", "Budgam Town", "Chadoora", "Magam", "Charar-i-Sharif",
  "Beerwah", "Kreeri", "Sopore Town", "Rafiabad", "Dangiwacha", "Tarzoo", "Wagoora", "Mawar", "Amargarh", "Pattan",
  "Tangmarg", "Kunzer", "Drangbal", "Gulmarg Gandola", "Affarwat", "Alpather", "Khilanmarg", "Drung", "Sheikhpora", "Watlab",
  "Baniyari", "Asham", "Gureze", "Dawar", "Tikkar", "Chandi Mandir", "Khour", "Hamirpur (J&K)", "Satwari", "Janipur",
  "Bakshi Nagar", "Gandhi Nagar (Jammu)", "Trikuta Nagar", "Nagrota", "Kunjwani", "Channi Himmat", "Sidhra", "Sainik Colony", "Talab Tillo", "Bhagwati Nagar",
  "Bahu Fort Area", "Railhead Complex", "Shastri Nagar (Jammu)", "Sunjwan", "Old City Jammu", "Jewel Chowk", "Gumat", "Nai Basti Jammu", "Shakti Nagar", "Peer Mitha",
  "Rehari Colony", "Bhore Camp", "Lower Roop Nagar", "Upper Roop Nagar", "Gole Market", "Residency Road Jammu", "Canal Road Jammu", "Dogra Chowk", "Raghunath Bazar", "Gandhi Bazar Jammu",
  "Raghunath Temple Area", "Pacca Danga", "Nanak Nagar (Jammu)", "Chowadi", "Digiana", "Kachi Chawni", "Sarwal", "Ashok Nagar Jammu", "Choudhary Nagar", "Bathindi",
  "Mandal", "Phallain", "Majalta", "Jakh", "Simbal Camp", "Damana", "Muthi", "Gajansoo", "Bain Bajalta", "Mishriwala",
  "Pargwal", "Dhar Mantalai", "Koteranka", "Noori Chhamb", "Sudhmahadev", "Kud", "Batote", "Ramsu", "Ramsoo", "Chanderkote",
  "Panthyal", "Dool", "Dhar Bhatti", "Thathri", "Gandoh", "Assar", "Palmar", "Dhandal", "Bhadarwah Valley", "Chinta Valley",
  "Paddar Valley", "Warwan Valley", "Margan Top", "Sinthan Top", "Peer Ki Gali", "Banihal Pass", "Jawahar Tunnel", "Nashri", "Cafeteria Morh", "Sudhmahadev Temple",
  "Mansar Lake", "Surinsar Lake", "Bahu Fort", "Mubarak Mandi", "Amar Mahal Palace", "Peer Baba Dargah", "Shiv Khori", "Sheetla Mata", "Sanasar", "Patnitop Resort",
  "Natha Top", "Baba Dhansar", "Kailash Kund", "Machail", "Kishtwar NP", "Marwah Valley", "Leh Road Junction", "Zero Bridge Srinagar", "Boulevard Road", "Residency Road Srinagar",
  "Maisuma", "Nowhatta", "Bohri Kadal", "Zaldagar", "Safakadal", "Rainawari", "Khanyar", "Habba Kadal", "Nawakadal", "Badiyari",
  "Barbarshah", "Shivpora", "Wazir Bagh", "Gogji Bagh", "Jawahar Nagar Srinagar", "Harwan", "Dachigam", "Nishat", "Chashme Shahi", "Pari Mahal",
  "Shankaracharya Hill", "Hari Parbat", "Naidkhai", "Nagin Lake", "Dal Lake", "Wular Lake", "Manasbal Lake", "Anchar Lake", "Hokersar Wetland", "Tosamaidan",
  "Yusmarg", "Doodhpathri", "Aharbal Waterfall", "Konsarnag", "Kounsarnag", "Tarsar", "Marsar", "Gangabal", "Naranag", "Vishansar",
  "Krishansar", "Gadsar", "Satsar", "Sheshnag Lake", "Kolahoi Glacier", "Machoi Glacier", "Drass", "Kargil (J&K)", "Zanskar (J&K)", "Nubra (J&K)",
  "Anantnag City", "Mattan Martand", "Bijbehara Town", "Islamabad (Anantnag)", "Larkipora", "Sagam", "Sirhama", "Kukarnag", "Achabal", "Seer",
  "Dialgam", "Khull", "Khovripora", "Chitragam", "Panzgam", "Naidkhai", "Wathal Naka", "Sopore Fruit Mandi", "Delina", "Khadanyar",
];

async function markJKLocations() {
  console.log("🔄 Marking Jammu & Kashmir locations...\n");
  console.log(`📍 Total locations to mark: ${JK_LOCATIONS.length}\n`);

  let updated = 0;
  let notFound = 0;
  const notFoundList: string[] = [];

  try {
    for (const locationName of JK_LOCATIONS) {
      // Find all location pages with this location name
      const locations = await prisma.locationPage.findMany({
        where: {
          location: locationName
        }
      });

      if (locations.length === 0) {
        notFound++;
        notFoundList.push(locationName);
        console.log(`   ⚠️  Not found: ${locationName}`);
        continue;
      }

      // Update all pages for this location
      await prisma.locationPage.updateMany({
        where: {
          location: locationName
        },
        data: {
          state: "Jammu & Kashmir"
        }
      });

      updated += locations.length;
      console.log(`   ✅ Updated ${locations.length} pages for: ${locationName}`);

      // Small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    console.log("\n" + "=".repeat(60));
    console.log(`✅ Successfully updated ${updated} location pages`);
    console.log(`⚠️  ${notFound} locations not found in database`);
    
    if (notFoundList.length > 0) {
      console.log("\n📋 Locations not found:");
      notFoundList.forEach(loc => console.log(`   - ${loc}`));
    }
    
  } catch (error) {
    console.error("❌ Error marking locations:", error);
  } finally {
    await prisma.$disconnect();
  }
}

markJKLocations();
