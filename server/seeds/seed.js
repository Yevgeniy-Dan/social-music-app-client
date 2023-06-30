const { default: axios } = require("axios");
const Post = require("../models/postModel");
const User = require("../models/userModel");

// const posts = [
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
//     userId: 1,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
//     userId: 2,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
//     userId: 3,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
//     userId: 4,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
//     userId: 5,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 6,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 7,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 8,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 9,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 10,
//   },
//   // Repeat the same set of posts for the remaining users
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 1,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 2,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1484876065684-b683cf17d276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 3,
//   },
//   {
//     mediaUrl:
//       "https://plus.unsplash.com/premium_photo-1682501735244-cc1343382b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 4,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1433622070098-754fdf81c929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 5,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1421217336522-861978fdf33a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 6,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 7,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 8,
//   },
//   {
//     mediaUrl:
//       "https://images.unsplash.com/photo-1605731414532-6b26976cc153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 9,
//   },
//   {
//     mediaUrl:
//       "https://plus.unsplash.com/premium_photo-1681738777245-6fb34243e769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//     userId: 10,
//   },
// ];

// 100 users
const users = [
  {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    bio: "I am a musician passionate about creating soulful melodies.",
    musicGenres: '["Rock", "Blues"]',
    socialMedia: '["twitter: johndoe", "instagram: johndoe"]',
    education: "Bachelor of Music",
  },
  {
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/89.jpg",
    bio: "Singer-songwriter exploring the depths of folk music.",
    musicGenres: '["Folk", "Indie"]',
    socialMedia: '["twitter: janesmith", "instagram: janesmith"]',
    education: "Music Conservatory",
  },
  {
    name: "Michael Johnson",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    bio: "Guitarist with a passion for shredding solos.",
    musicGenres: '["Metal", "Rock"]',
    socialMedia: '["twitter: michaeljohnson", "instagram: michaeljohnson"]',
    education: "Self-taught",
  },
  {
    name: "Emily Johnson",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    bio: "Pianist and composer passionate about classical music.",
    musicGenres: '["Classical", "Instrumental"]',
    socialMedia: '["twitter: emilyjohnson", "instagram: emilyjohnson"]',
    education: "Master of Music",
  },
  {
    name: "David Brown",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    bio: "Drummer with a love for rhythm and groove.",
    musicGenres: '["Funk", "R&B"]',
    socialMedia: '["twitter: davidbrown", "instagram: davidbrown"]',
    education: "Music Institute",
  },
  {
    name: "Sarah Adams",
    avatar: "https://randomuser.me/api/portraits/women/94.jpg",
    bio: "Saxophonist exploring the world of jazz improvisation.",
    musicGenres: '["Jazz", "Fusion"]',
    socialMedia: '["twitter: sarahadams", "instagram: sarahadams"]',
    education: "Jazz Conservatory",
  },
  {
    name: "Michael Wilson",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    bio: "Guitarist with a passion for rock and blues.",
    musicGenres: '["Rock", "Blues"]',
    socialMedia: '["twitter: michaelwilson", "instagram: michaelwilson"]',
    education: "Self-taught",
  },
  {
    name: "Olivia Thompson",
    avatar: "https://randomuser.me/api/portraits/women/84.jpg",
    bio: "Vocalist with a soulful voice and love for jazz standards.",
    musicGenres: '["Jazz", "Soul"]',
    socialMedia: '["twitter: oliviathompson", "instagram: oliviathompson"]',
    education: "Music Academy",
  },
  {
    name: "Daniel Rodriguez",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    bio: "Bassist and songwriter exploring various music styles.",
    musicgenres: '["Pop", "Funk", "Reggae"]',
    socialMedia: '["twitter: danielrodriguez", "instagram: danielrodriguez"]',
    education: "Bachelor of Music",
  },
  {
    name: "Sophia Martinez",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    bio: "Violinist specializing in classical and orchestral performances.",
    musicGenres: '["Classical", "Orchestral"]',
    socialMedia: '["twitter: sophiamartinez", "instagram: sophiamartinez"]',
    education: "Conservatory of Music",
  },
  {
    name: "Matthew Walker",
    avatar: "https://randomuser.me/api/portraits/men/89.jpg",
    bio: "I am a poet, expressing emotions through words that touch the soul.",
    musicGenres: '["Poetry", "Ambient"]',
    socialMedia: '["twitter: matthewwalker", "instagram: matthewwalker"]',
    education: "Bachelor of Arts in Literature",
  },
  {
    name: "Emma Thompson",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    bio: "I am a pianist creating melodies that evoke deep emotions.",
    musicGenres: '["Classical", "Contemporary"]',
    socialMedia: '["twitter: emmathompson", "instagram: emmathompson"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/37.jpg",
    bio: "I am a singer-songwriter, pouring my heart into every lyric.",
    musicGenres: '["Pop", "Folk"]',
    socialMedia: '["twitter: sarahjohnson", "instagram: sarahjohnson"]',
    education: "Bachelor of Music Composition",
  },
  {
    name: "Michael Anderson",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "I am a guitarist, creating electrifying riffs that ignite the stage.",
    musicGenres: '["Rock", "Metal"]',
    socialMedia: '["twitter: michaelanderson", "instagram: michaelanderson"]',
    education: "Self-taught",
  },
  {
    name: "Olivia Wilson",
    avatar: "https://randomuser.me/api/portraits/women/81.jpg",
    bio: "I am a violinist, expressing my emotions through the strings.",
    musicGenres: '["Classical", "Cinematic"]',
    socialMedia: '["twitter: oliviawilson", "instagram: oliviawilson"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Daniel Lee",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
    bio: "I am a drummer, setting the rhythm that drives the music forward.",
    musicGenres: '["Rock", "Jazz"]',
    socialMedia: '["twitter: daniellee", "instagram: daniellee"]',
    education: "Bachelor of Music Education",
  },
  {
    name: "Sophia Martin",
    avatar: "https://randomuser.me/api/portraits/women/92.jpg",
    bio: "I am a cellist, painting vivid melodies with every bow stroke.",
    musicGenres: '["Classical", "Experimental"]',
    socialMedia: '["twitter: sophiamartin", "instagram: sophiamartin"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "David Thompson",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    bio: "I am a saxophonist, blending soulful notes into smooth jazz melodies.",
    musicGenres: '["Jazz", "Funk"]',
    socialMedia: '["twitter: davidthompson", "instagram: davidthompson"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Emily Roberts",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    bio: "I am a pianist, capturing emotions through the keys of the grand piano.",
    musicGenres: '["Classical", "Film Score"]',
    socialMedia: '["twitter: emilyroberts", "instagram: emilyroberts"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Liam Davis",
    avatar: "https://randomuser.me/api/portraits/men/79.jpg",
    bio: "I am a bassist, providing a solid foundation for the music to groove.",
    musicGenres: '["Rock", "Funk"]',
    socialMedia: '["twitter: liamdavis", "instagram: liamdavis"]',
    education: "Self-taught",
  },
  {
    name: "Chloe Wilson",
    avatar: "https://randomuser.me/api/portraits/women/61.jpg",
    bio: "I am a vocalist, using my voice to touch hearts and inspire.",
    musicGenres: '["Pop", "R&B"]',
    socialMedia: '["twitter: chloewilson", "instagram: chloewilson"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Ethan Thompson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "I am a guitarist, shredding solos that ignite the crowd's energy.",
    musicGenres: '["Rock", "Metal"]',
    socialMedia: '["twitter: ethanthompson", "instagram: ethanthompson"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Ava Davis",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "I am a pianist, creating melodies that resonate with the soul.",
    musicGenres: '["Classical", "New Age"]',
    socialMedia: '["twitter: avadavis", "instagram: avadavis"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Noah Thompson",
    avatar: "https://randomuser.me/api/portraits/men/90.jpg",
    bio: "I am a drummer, bringing the heartbeat to the rhythm of the music.",
    musicGenres: '["Rock", "Jazz"]',
    socialMedia: '["twitter: noahthompson", "instagram: noahthompson"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Mia Evans",
    avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    bio: "I am a guitarist, strumming chords that fill the air with harmony.",
    musicGenres: '["Pop", "Indie"]',
    socialMedia: '["twitter: miaevans", "instagram: miaevans"]',
    education: "Self-taught",
  },
  {
    name: "William Martinez",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    bio: "I am a violinist, weaving emotions through the delicate strings.",
    musicGenres: '["Classical", "Contemporary"]',
    socialMedia: '["twitter: williammartinez", "instagram: williammartinez"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Charlotte Harris",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    bio: "I am a vocalist, using my voice to paint stories with every note.",
    musicGenres: '["Jazz", "Soul"]',
    socialMedia: '["twitter: charlotteharris", "instagram: charlotteharris"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "James Clark",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    bio: "I am a saxophonist, capturing the essence of jazz in every breath.",
    musicGenres: '["Jazz", "Blues"]',
    socialMedia: '["twitter: jamesclark", "instagram: jamesclark"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Isabella Turner",
    avatar: "https://randomuser.me/api/portraits/women/73.jpg",
    bio: "I am a cellist, playing heartfelt melodies that stir the soul.",
    musicGenres: '["Classical", "Film Score"]',
    socialMedia: '["twitter: isabellaturner", "instagram: isabellaturner"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Alexander King",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    bio: "I am a bassist, laying down the groove that moves the music.",
    musicGenres: '["Rock", "Funk"]',
    socialMedia: '["twitter: alexanderking", "instagram: alexanderking"]',
    education: "Self-taught",
  },
  {
    name: "Olivia Lee",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    bio: "I am a keyboardist, creating melodies that resonate with the audience.",
    musicGenres: '["Pop", "Electronic"]',
    socialMedia: '["twitter: olivialee", "instagram: olivialee"]',
    education: "Bachelor of Music",
  },
  {
    name: "Ethan Wright",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    bio: "I am a guitarist, strumming chords that bring joy and energy to the music.",
    musicGenres: '["Rock", "Indie"]',
    socialMedia: '["twitter: ethanwright", "instagram: ethanwright"]',
    education: "Self-taught",
  },
  {
    name: "Sophia Baker",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
    bio: "I am a violinist, expressing emotions through the elegant strings.",
    musicGenres: '["Classical", "Folk"]',
    socialMedia: '["twitter: sophiabaker", "instagram: sophiabaker"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Liam Foster",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "I am a drummer, providing the rhythm that sets the pace for the music.",
    musicGenres: '["Rock", "Metal"]',
    socialMedia: '["twitter: liamfoster", "instagram: liamfoster"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Amelia Wright",
    avatar: "https://randomuser.me/api/portraits/women/77.jpg",
    bio: "I am a vocalist, enchanting the audience with my soulful voice.",
    musicGenres: '["Pop", "R&B"]',
    socialMedia: '["twitter: ameliawright", "instagram: ameliawright"]',
    education: "Bachelor of Music",
  },
  {
    name: "Benjamin Turner",
    avatar: "https://randomuser.me/api/portraits/men/58.jpg",
    bio: "I am a saxophonist, playing smooth melodies that captivate the listeners.",
    musicGenres: '["Jazz", "Funk"]',
    socialMedia: '["twitter: benjaminturner", "instagram: benjaminturner"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Ava Clark",
    avatar: "https://randomuser.me/api/portraits/women/41.jpg",
    bio: "I am a cellist, evoking emotions through the rich tones of my instrument.",
    musicGenres: '["Classical", "Contemporary"]',
    socialMedia: '["twitter: avaclark", "instagram: avaclark"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Henry Mitchell",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    bio: "I am a bassist, anchoring the music with my deep and resonant sound.",
    musicGenres: '["Rock", "Blues"]',
    socialMedia: '["twitter: henrymitchell", "instagram: henrymitchell"]',
    education: "Bachelor of Music",
  },
  {
    name: "Mia Baker",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    bio: "I am a flutist, playing melodies that float and dance in the air.",
    musicGenres: '["Classical", "World"]',
    socialMedia: '["twitter: miabaker", "instagram: miabaker"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Daniel Hill",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    bio: "I am a guitarist, crafting intricate melodies that touch the soul.",
    musicGenres: '["Acoustic", "Folk"]',
    socialMedia: '["twitter: danielhill", "instagram: danielhill"]',
    education: "Bachelor of Music",
  },
  {
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/92.jpg",
    bio: "I am a pianist, expressing emotions through the keys of the piano.",
    musicGenres: '["Classical", "Jazz"]',
    socialMedia: '["twitter: emilydavis", "instagram: emilydavis"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Alexander Turner",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
    bio: "I am a guitarist, creating melodies that resonate with the audience.",
    musicGenres: '["Rock", "Blues"]',
    socialMedia: '["twitter: alexanderturner", "instagram: alexanderturner"]',
    education: "Bachelor of Music",
  },
  {
    name: "Charlotte Martin",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    bio: "I am a vocalist, captivating the audience with my powerful voice.",
    musicGenres: '["Pop", "Soul"]',
    socialMedia: '["twitter: charlottemartin", "instagram: charlottemartin"]',
    education: "Bachelor of Music",
  },
  {
    name: "James Roberts",
    avatar: "https://randomuser.me/api/portraits/men/39.jpg",
    bio: "I am a drummer, providing the rhythm that drives the music forward.",
    musicGenres: '["Rock", "Alternative"]',
    socialMedia: '["twitter: jamesroberts", "instagram: jamesroberts"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Harper Phillips",
    avatar: "https://randomuser.me/api/portraits/women/82.jpg",
    bio: "I am a violinist, playing enchanting melodies that touch the heart.",
    musicGenres: '["Classical", "Folk"]',
    socialMedia: '["twitter: harperphillips", "instagram: harperphillips"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Sebastian Lewis",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "I am a bassist, providing a solid foundation for the music to build upon.",
    musicGenres: '["Jazz", "Funk"]',
    socialMedia: '["twitter: sebastianlewis", "instagram: sebastianlewis"]',
    education: "Bachelor of Music",
  },
  {
    name: "Scarlett Hill",
    avatar: "https://randomuser.me/api/portraits/women/34.jpg",
    bio: "I am a cellist, creating melodies that resonate deeply within the soul.",
    musicGenres: '["Classical", "Contemporary"]',
    socialMedia: '["twitter: scarletthill", "instagram: scarletthill"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "William Moore",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    bio: "I am a guitarist, strumming chords that bring joy and inspiration.",
    musicGenres: '["Acoustic", "Indie"]',
    socialMedia: '["twitter: williammoore", "instagram: williammoore"]',
    education: "Bachelor of Music",
  },
  {
    name: "Aria Cooper",
    avatar: "https://randomuser.me/api/portraits/women/75.jpg",
    bio: "I am a vocalist, sharing stories through the power of my voice.",
    musicGenres: '["Pop", "R&B"]',
    socialMedia: '["twitter: ariacooper", "instagram: ariacooper"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Oliver Turner",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    bio: "I am a drummer, providing beats that make the audience groove.",
    musicGenres: '["Rock", "Punk"]',
    socialMedia: '["twitter: oliverturner", "instagram: oliverturner"]',
    education: "Bachelor of Music",
  },
  {
    name: "Oliver Lewis",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "I am a guitarist, passionate about creating melodic and catchy tunes.",
    musicGenres: '["Rock", "Indie"]',
    socialMedia: '["twitter: oliverlewis", "instagram: oliverlewis"]',
    education: "Bachelor of Music",
  },
  {
    name: "Charlotte Parker",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    bio: "I am a pianist, expressing emotions through the enchanting keys.",
    musicGenres: '["Classical", "Jazz"]',
    socialMedia: '["twitter: charlotteparker", "instagram: charlotteparker"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Noah Turner",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    bio: "I am a drummer, providing the rhythmic backbone for the music.",
    musicGenres: '["Rock", "Metal"]',
    socialMedia: '["twitter: noahturner", "instagram: noahturner"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Sophie Wright",
    avatar: "https://randomuser.me/api/portraits/women/81.jpg",
    bio: "I am a vocalist, enchanting the audience with my powerful voice.",
    musicGenres: '["Pop", "Soul"]',
    socialMedia: '["twitter: sophiewright", "instagram: sophiewright"]',
    education: "Bachelor of Music",
  },
  {
    name: "Jack Foster",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    bio: "I am a bassist, laying down the groove and keeping the music grounded.",
    musicGenres: '["Funk", "R&B"]',
    socialMedia: '["twitter: jackfoster", "instagram: jackfoster"]',
    education: "Bachelor of Music",
  },
  {
    name: "Lily Mitchell",
    avatar: "https://randomuser.me/api/portraits/women/95.jpg",
    bio: "I am a violinist, playing beautiful melodies that tug at the heartstrings.",
    musicGenres: '["Classical", "Film Score"]',
    socialMedia: '["twitter: lilymitchell", "instagram: lilymitchell"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Lucas Clark",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    bio: "I am a guitarist, creating soulful and emotive music with my strings.",
    musicGenres: '["Blues", "Rock"]',
    socialMedia: '["twitter: lucasclark", "instagram: lucasclark"]',
    education: "Bachelor of Music",
  },
  {
    name: "Emily Turner",
    avatar: "https://randomuser.me/api/portraits/women/34.jpg",
    bio: "I am a flutist, playing melodies that soar and captivate the listeners.",
    musicGenres: '["Classical", "World"]',
    socialMedia: '["twitter: emilyturner", "instagram: emilyturner"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Benjamin Bell",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    bio: "I am a pianist, composing intricate and evocative music.",
    musicGenres: '["Classical", "Contemporary"]',
    socialMedia: '["twitter: benjaminbell", "instagram: benjaminbell"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Grace Parker",
    avatar: "https://randomuser.me/api/portraits/women/77.jpg",
    bio: "I am a cellist, expressing emotions through the resonant tones of my instrument.",
    musicGenres: '["Classical", "Chamber"]',
    socialMedia: '["twitter: graceparker", "instagram: graceparker"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Emily Harris",
    avatar: "https://randomuser.me/api/portraits/women/84.jpg",
    bio: "I am a pianist, expressing emotions through the delicate keys.",
    musicGenres: '["Classical", "Film Score"]',
    socialMedia: '["twitter: emilyharris", "instagram: emilyharris"]',
    education: "Master of Music",
  },
  {
    name: "James Turner",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    bio: "I am a songwriter, crafting lyrics that resonate with the listeners.",
    musicGenres: '["Pop", "Country"]',
    socialMedia: '["twitter: jamesturner", "instagram: jamesturner"]',
    education: "Bachelor of Arts in Music",
  },
  {
    name: "Charlotte White",
    avatar: "https://randomuser.me/api/portraits/women/94.jpg",
    bio: "I am a harpist, creating enchanting melodies with the ethereal strings.",
    musicGenres: '["Classical", "Celtic"]',
    socialMedia: '["twitter: charlottewhite", "instagram: charlottewhite"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Alexander Lewis",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    bio: "I am a trumpet player, adding a vibrant and powerful sound to the music.",
    musicGenres: '["Jazz", "Latin"]',
    socialMedia: '["twitter: alexanderlewis", "instagram: alexanderlewis"]',
    education: "Bachelor of Music",
  },
  {
    name: "Scarlett Wilson",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    bio: "I am a singer-songwriter, pouring my heart and soul into every lyric.",
    musicGenres: '["Pop", "Indie"]',
    socialMedia: '["twitter: scarlettwilson", "instagram: scarlettwilson"]',
    education: "Bachelor of Music",
  },
  {
    name: "William Turner",
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    bio: "I am a violinist, playing melodies that touch the deepest emotions.",
    musicGenres: '["Classical", "Experimental"]',
    socialMedia: '["twitter: williamturner", "instagram: williamturner"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Grace Martin",
    avatar: "https://randomuser.me/api/portraits/women/27.jpg",
    bio: "I am a guitarist, strumming chords that bring warmth and joy to the music.",
    musicGenres: '["Acoustic", "Folk"]',
    socialMedia: '["twitter: gracemartin", "instagram: gracemartin"]',
    education: "Bachelor of Music",
  },
  {
    name: "Daniel Johnson",
    avatar: "https://randomuser.me/api/portraits/men/92.jpg",
    bio: "I am a bassist, laying down the grooves that make the music groove.",
    musicGenres: '["Rock", "Funk"]',
    socialMedia: '["twitter: danieljohnson", "instagram: danieljohnson"]',
    education: "Bachelor of Music",
  },
  {
    name: "Olivia Lee",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    bio: "I am a cellist, drawing out the rich and soulful tones from the strings.",
    musicGenres: '["Classical", "Contemporary"]',
    socialMedia: '["twitter: olivialee", "instagram: olivialee"]',
    education: "Master of Music",
  },
  {
    name: "Henry Davis",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    bio: "I am a drummer, providing the rhythmic heartbeat that drives the music.",
    musicGenres: '["Rock", "Blues"]',
    socialMedia: '["twitter: henrydavis", "instagram: henrydavis"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Charlotte Turner",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    bio: "I am a pianist, creating beautiful melodies that resonate with the audience.",
    musicGenres: '["Classical", "Contemporary"]',
    socialMedia: '["twitter: charlotteturner", "instagram: charlotteturner"]',
    education: "Bachelor of Music",
  },
  {
    name: "James Murphy",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "I am a guitarist, shredding the strings with passion and precision.",
    musicGenres: '["Rock", "Metal"]',
    socialMedia: '["twitter: jamesmurphy", "instagram: jamesmurphy"]',
    education: "Self-taught",
  },
  {
    name: "Aria Mitchell",
    avatar: "https://randomuser.me/api/portraits/women/31.jpg",
    bio: "I am a vocalist, singing with power and emotion to touch hearts.",
    musicGenres: '["Pop", "Soul"]',
    socialMedia: '["twitter: ariamitchell", "instagram: ariamitchell"]',
    education: "Bachelor of Music",
  },
  {
    name: "Alexander Scott",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    bio: "I am a drummer, driving the beat that gets people grooving.",
    musicGenres: '["Rock", "Funk"]',
    socialMedia: '["twitter: alexanderscott", "instagram: alexanderscott"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Grace Turner",
    avatar: "https://randomuser.me/api/portraits/women/85.jpg",
    bio: "I am a violinist, playing melodies that stir the soul.",
    musicGenres: '["Classical", "Celtic"]',
    socialMedia: '["twitter: graceturner", "instagram: graceturner"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Michael Evans",
    avatar: "https://randomuser.me/api/portraits/men/26.jpg",
    bio: "I am a bassist, providing the deep foundation for the music to thrive.",
    musicGenres: '["Jazz", "Fusion"]',
    socialMedia: '["twitter: michaelevans", "instagram: michaelevans"]',
    education: "Bachelor of Music",
  },
  {
    name: "Emily Foster",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    bio: "I am a keyboardist, adding layers of harmony to elevate the music.",
    musicGenres: '["Pop", "Electronic"]',
    socialMedia: '["twitter: emilyfoster", "instagram: emilyfoster"]',
    education: "Bachelor of Music",
  },
  {
    name: "William Cooper",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    bio: "I am a guitarist, strumming chords that resonate with the soul.",
    musicGenres: '["Acoustic", "Indie"]',
    socialMedia: '["twitter: williamcooper", "instagram: williamcooper"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Olivia Hughes",
    avatar: "https://randomuser.me/api/portraits/women/73.jpg",
    bio: "I am a cellist, creating melodies that evoke deep emotions.",
    musicGenres: '["Classical", "Experimental"]',
    socialMedia: '["twitter: oliviahughes", "instagram: oliviahughes"]',
    education: "Master of Music Performance",
  },
  {
    name: "Daniel Wood",
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    bio: "I am a saxophonist, playing soulful melodies that captivate the audience.",
    musicGenres: '["Jazz", "R&B"]',
    socialMedia: '["twitter: danielwood", "instagram: danielwood"]',
    education: "Bachelor of Music",
  },
  {
    name: "Sophia Campbell",
    avatar: "https://randomuser.me/api/portraits/women/91.jpg",
    bio: "I am a guitarist, expressing my emotions through the strings.",
    musicGenres: '["Rock", "Blues"]',
    socialMedia: '["twitter: sophiacampbell", "instagram: sophiacampbell"]',
    education: "Bachelor of Music",
  },
  {
    name: "Benjamin Nelson",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    bio: "I am a drummer, setting the rhythm that brings the music to life.",
    musicGenres: '["Rock", "Pop"]',
    socialMedia: '["twitter: benjaminnelson", "instagram: benjaminnelson"]',
    education: "Bachelor of Music Performance",
  },
  {
    name: "Emma Rivera",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
    bio: "I am a vocalist, using my voice to touch hearts and inspire.",
    musicGenres: '["Pop", "Soul"]',
    socialMedia: '["twitter: emmarivera", "instagram: emmarivera"]',
    education: "Bachelor of Music",
  },
  {
    name: "Henry Parker",
    avatar: "https://randomuser.me/api/portraits/men/84.jpg",
    bio: "I am a pianist, playing enchanting melodies that transport the listener.",
    musicGenres: '["Classical", "Contemporary"]',
    socialMedia: '["twitter: henryparker", "instagram: henryparker"]',
    education: "Master of Music Performance",
  },
  {
    name: "Ava Foster",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    bio: "I am a violinist, creating harmonies that resonate with the soul.",
    musicGenres: '["Classical", "Folk"]',
    socialMedia: '["twitter: avafoster", "instagram: avafoster"]',
    education: "Bachelor of Music",
  },
  {
    name: "Jackson Phillips",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    bio: "I am a bassist, laying down the groove that makes people move.",
    musicGenres: '["Jazz", "Funk"]',
    socialMedia: '["twitter: jacksonphillips", "instagram: jacksonphillips"]',
    education: "Bachelor of Music",
  },
  {
    name: "Isabella Morgan",
    avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    bio: "I am a keyboardist, creating atmospheric sounds that take the music to new heights.",
    musicGenres: '["Electronic", "Ambient"]',
    socialMedia: '["twitter: isabellamorgan", "instagram: isabellamorgan"]',
    education: "Bachelor of Music",
  },
  {
    name: "Mason Turner",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "I am a guitarist, strumming chords that resonate with the soul.",
    musicGenres: '["Acoustic", "Indie"]',
    socialMedia: '["twitter: masonturner", "instagram: masonturner"]',
    education: "Bachelor of Music",
  },
  {
    name: "Grace Powell",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    bio: "I am a cellist, playing melodies that transport the listener to another world.",
    musicGenres: '["Classical", "Film Score"]',
    socialMedia: '["twitter: gracepowell", "instagram: gracepowell"]',
    education: "Master of Music Performance",
  },
  {
    name: "Oliver Martinez",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    bio: "I am a drummer, adding the heartbeat to the music.",
    musicGenres: '["Rock", "Punk"]',
    socialMedia: '["twitter: olivermartinez", "instagram: olivermartinez"]',
    education: "Bachelor of Music",
  },
  {
    name: "Lily Simmons",
    avatar: "https://randomuser.me/api/portraits/women/37.jpg",
    bio: "I am a vocalist, using my voice to convey emotions and tell stories.",
    musicGenres: '["Pop", "R&B"]',
    socialMedia: '["twitter: lilysimmons", "instagram: lilysimmons"]',
    education: "Bachelor of Music",
  },
  {
    name: "Ethan Reed",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    bio: "I am a pianist, creating beautiful melodies that touch the heart.",
    musicGenres: '["Classical", "New Age"]',
    socialMedia: '["twitter: ethanreed", "instagram: ethanreed"]',
    education: "Master of Music Performance",
  },
  {
    name: "Chloe Collins",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    bio: "I am a guitarist, strumming melodies that bring joy and comfort.",
    musicGenres: '["Acoustic", "Country"]',
    socialMedia: '["twitter: chloecollins", "instagram: chloecollins"]',
    education: "Bachelor of Music",
  },
  {
    name: "James Murphy",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    bio: "I am a bassist, setting the foundation for the music to come alive.",
    musicGenres: '["Jazz", "Fusion"]',
    socialMedia: '["twitter: jamesmurphy", "instagram: jamesmurphy"]',
    education: "Bachelor of Music",
  },
  {
    name: "Amelia Young",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
    bio: "I am a vocalist, using my voice to inspire and uplift.",
    musicGenres: '["Pop", "Soul"]',
    socialMedia: '["twitter: ameliayoung", "instagram: ameliayoung"]',
    education: "Bachelor of Music",
  },
  {
    name: "Alexander Wright",
    avatar: "https://randomuser.me/api/portraits/men/95.jpg",
    bio: "I am a keyboardist, creating melodic landscapes that transport the listener.",
    musicGenres: '["Electronic", "Ambient"]',
    socialMedia: '["twitter: alexanderwright", "instagram: alexanderwright"]',
    education: "Bachelor of Music",
  },
  {
    name: "Avery Hall",
    avatar: "https://randomuser.me/api/portraits/women/75.jpg",
    bio: "I am a guitarist, strumming chords that create a sense of peace.",
    musicGenres: '["Acoustic", "Indie"]',
    socialMedia: '["twitter: averyhall", "instagram: averyhall"]',
    education: "Bachelor of Music",
  },
  {
    name: "Lucas Morris",
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
    bio: "I am a cellist, creating emotive melodies that touch the soul.",
    musicGenres: '["Classical", "Film Score"]',
    socialMedia: '["twitter: lucasmorris", "instagram: lucasmorris"]',
    education: "Master of Music Performance",
  },
  {
    name: "Mia Rivera",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    bio: "I am a drummer, adding rhythm and energy to the music.",
    musicGenres: '["Rock", "Pop"]',
    socialMedia: '["twitter: miarivera", "instagram: miarivera"]',
    education: "Bachelor of Music",
  },
  {
    name: "Noah Garcia",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    bio: "I am a vocalist, using my voice to connect with people's emotions.",
    musicGenres: '["Pop", "R&B"]',
    socialMedia: '["twitter: noahgarcia", "instagram: noahgarcia"]',
    education: "Bachelor of Music",
  },
  {
    name: "Sofia Hill",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    bio: "I am a pianist, playing melodies that evoke feelings of tranquility.",
    musicGenres: '["Classical", "New Age"]',
    socialMedia: '["twitter: sofiahill", "instagram: sofiahill"]',
    education: "Master of Music Performance",
  },
  {
    name: "Daniel Cooper",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    bio: "I am a guitarist, expressing my soul through the strings.",
    musicGenres: '["Acoustic", "Blues"]',
    socialMedia: '["twitter: danielcooper", "instagram: danielcooper"]',
    education: "Bachelor of Music",
  },
];

const sequelize = require("../utils/database");

const destroy = async () => {
  await User.destroy({ where: {} });
  await Post.destroy({ where: {} });
};

const drop = async () => {
  let tableName = "posts";
  let dropTableQuery = `DROP TABLE IF EXISTS ${tableName}`;

  await sequelize.query(dropTableQuery, (error) => {
    if (error) {
      console.log("Error deleting posts table:".red, error);
    } else {
      console.log("Posts table deleted successfully.".magenta);
    }
  });

  tableName = "users";
  dropTableQuery = `DROP TABLE IF EXISTS ${tableName}`;

  await sequelize.query(dropTableQuery, (error) => {
    if (error) {
      console.log("Error deleting users table:".red, error);
    } else {
      console.log("Users table deleted successfully.".magenta);
    }
  });
  console.log("Users and posts tables deleted successfully.".magenta.underline);
};

const create = async () => {
  await User.bulkCreate(users);
  console.log("Users table created successfully".green.underline);
  const updatedPosts = await getUnsplashImages();
  await Post.bulkCreate(updatedPosts);
  console.log("Posts table created successfully".green.underline);
};

const getUnsplashImages = async () => {
  try {
    let updatedPosts = [];

    for (let i = 0; i < 17; i++) {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            count: 30,
            client_id: process.env.UNSPLASH_ACCESS_KEY,
            query: "music piano guitar",
          },
        }
      );
      const posts = response.data.map((image) => {
        return {
          mediaUrl: image.urls.regular,
          userId: Math.floor(Math.random() * 102) + 1,
        };
      });

      updatedPosts.push(...posts);
    }

    updatedPosts.map((post) => {
      console.log(`${JSON.stringify(post)}`.magenta);
    });
    return updatedPosts;
  } catch (error) {
    console.log("Error fetching Unsplash images:".red, error);
  }
};

const seed = async () => {
  try {
    // await destroy();
    // await drop();
    // await sequelize.sync();
    // await create();
    // console.log("Data seeded successfully.".yellow.underline);
  } catch (error) {
    console.error("Error seeding data:".red.underline, error);
  }
};

module.exports = {
  seed,
};
