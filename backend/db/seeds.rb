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
    }
]

# Create all the song related objects
song_data.each do |song_data_item|
    SpotifyTrack.create!(song_data_item)
end
