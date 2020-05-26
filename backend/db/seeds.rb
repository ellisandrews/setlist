# Clean out the database of all data
DatabaseCleaner.strategy = :truncation
DatabaseCleaner.clean

# Create a fake user
user = User.create!(first_name: 'John', last_name: 'Doe', email: 'johndoe@fake.com', password: 'password')

# Collection of nested song-related objects to be created (SpotifyTrack -> Song -> Sections).
# This leverages the `accepts_nested_attributes_for` set up on the models for creating dependent objects.
song_data = [
    {
        title: "Lonely Weekend",
        artist: "Kacey Musgraves",
        artwork_url: "https://i.scdn.co/image/ab67616d0000b2732e35d25eb7288830d5540484",
        spotify_id: "3420nZEhm99I1bLc6Yx4XH",
        songs_attributes: [{
            guitar_type: "Acoustic",
            capo: 3,
            strumming: "DudU udU udu udu",
            youtube_id: "M37Ut3uaHMs",
            notes: "The F is played as 3 finger open chord (open high 'e' string). Second and third chords change on the up beats! Indicated by the capital letters here: ONE and two AND ... and 4 AND",
            user: user,
            sections_attributes: [
                {
                    name: "Intro/Chorus",
                    chords: "F C G G",
                    display_order: 1
                },
                {
                    name: "Verse",
                    chords: "G G F G",
                    display_order: 2
                },
                {
                    name: "Bridge",
                    chords: "C C7 F F, C C7 F Dm",
                    display_order: 3
                }
            ]
        }]
    },
    {
        title: "Mary Jane's Last Dance",
        artist: "Tom Petty and the Heartbreakers",
        artwork_url: "https://i.scdn.co/image/ab67616d0000b2730c3a1b46b6b846dfdfbc6a7d",
        spotify_id: "3dmqIB2Qxe2XZobw9gXxJ6",
        songs_attributes: [{
            guitar_type: nil,
            capo: nil,
            strumming: "DU D UDUDD DU",
            youtube_id: "vKru2yeVgFg",
            notes: "Hammer on with the Am and Dsus2 in the Intro/Verse/Solo.",
            user: user,
            sections_attributes: [
                {
                    name: "Intro/Verse/Solo",
                    chords: "Am G Dsus2 Am",
                    display_order: 1
                },
                {
                    name: "Chorus",
                    chords: "Em7 Em7 A / Em7 Em7 A G",
                    display_order: 2,
                }
            ]
        }]
    },
    {
        title: "Gravity",
        artist: "John Mayer",
        artwork_url: "https://i.scdn.co/image/ab67616d0000b2737af5fdc5ef048a68db62b85f",
        spotify_id: "3SktMqZmo3M9zbB7oKMIF7",
        songs_attributes: [{
            guitar_type: "Electric",
            capo: nil,
            strumming: "D D DUD UDUDU",
            youtube_id: "3_yOc3VDU5I",
            notes: "Put a little reverb on it and take your time.",
            user: user,
            sections_attributes: [
                {
                    name: "Intro/Chorus/Outro",
                    chords: "G C",
                    display_order: 1
                },
                {
                    name: "Verse",
                    chords: "Am7 D7 Gm/Bb Ebmaj7 D7",
                    display_order: 2,
                }
            ]
        }]
    },
    {
        title: "Ain't No Sunshine",
        artist: "Bill Withers",
        artwork_url: "https://i.scdn.co/image/ab67616d0000b273e1e350d06ffebd2e19e047ce", 
        spotify_id: "1k1Bqnv2R0uJXQN4u6LKYt",
        songs_attributes: [{
            guitar_type: "Acoustic",
            capo: nil,
            strumming: "D d D du", 
            youtube_id: "a25g71iwa2A",
            notes: "Hang out on Am, until the \"turn around\" with a single hit on each of Em and G. Play the Em7 and Dm7 as barre chords (a simple slide-down).",
            user: user,
            sections_attributes: [{
                name: "Whole Song",
                chords: "Am Em G Am (x2), Em7 Dm7, Am Em G Am",
                display_order: 1
            }]
        }]
    },
    {
        title: "Californication",
        artist: "Red Hot Chili Peppers",
        artwork_url: "https://i.scdn.co/image/ab67616d0000b27394d08ab63e57b0cae74e8595",
        spotify_id: "48UPSzbZjgc449aqz8bxox",
        songs_attributes: [{
            guitar_type: "Electric",
            capo: nil,
            strumming: nil,
            youtube_id: "ryGJpnT98-E",
            notes: "See the video for picking the Am and F for the intro and interludes.",
            user: user,
            sections_attributes: [
                {
                    name: "Verse",
                    chords: "Am F (x2), C G F Dm",
                    display_order: 1
                },
                {
                    name: "Interlude",
                    chords: "Am F (x2)",
                    display_order: 2
                },
                {
                    name: "Chorus",
                    chords: "C G Dm Am, C G Dm",
                    display_order: 3
                },
                {
                    name: "Solo",
                    chords: "F#m D (x2), Bm D A E (x3), Am F (x2)",
                    display_order: 4
                }
            ]
        }]
    }
]

# Create all the song related objects
song_data.each do |song_data_item|
    SpotifyTrack.create!(song_data_item)
end
