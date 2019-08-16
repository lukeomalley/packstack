# wipe database before seeding

Card.destroy_all
Pack.destroy_all
User.destroy_all
View.destroy_all

# users

bob = User.create(name: 'Bob', image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRojOunWn-_b6oMG-gD36ZRkXiRfAMcccvSpO1Br7iXliUVHLJG')
sally = User.create(name: 'Sally', image_url: 'https://i.pinimg.com/474x/91/59/70/915970f771eff250b45dbc314707d79c.jpg')
tony = User.create(name: 'Tony', image_url: 'http://popicon.life/wp-content/uploads/2019/01/169tonybanner.jpg')

# packs

ruby = Pack.create(name: 'Ruby', description: 'Revew your Ruby skills!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user_id: User.find(tony))
javascript = Pack.create(name: 'Javascript', description: 'Test yourself on these Javascript questions.', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user_id: User.find(sally))
rails = Pack.create(name: 'Rails', description: 'Practice with a Rails quiz!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user_id: User.find(bob))
scaffold = Pack.create(name: 'Scaffold', description: 'Revew your Scaffold skills!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user_id: User.find(sally))
gems = Pack.create(name: 'Gems', description: 'Test yourself on these Gems questions.', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user_id: User.find(bob))
pair_programming = Pack.create(name: 'Pair-Programming', description: 'Practice with a Pair-Programming quiz!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user_id: User.find(sally))
generators = Pack.create(name: 'Generators', description: 'Revew your Generators skills!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user_id: User.find(bob))
apis = Pack.create(name: 'APIs', description: 'Test yourself on these APIs questions.', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user_id: User.find(sally))
python = Pack.create(name: 'Python', description: 'Practice with a Python quiz!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user_id: User.find(sally))
sql = Pack.create(name: 'SQL', description: 'Revew your SQL skills!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user_id: User.find(sally))
ancient_greece = Pack.create(name: 'Ancient Greece', description: 'Test yourself on these Ancient Greece questions.', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user_id: User.find(sally))
presidents = Pack.create(name: 'Presidents', description: 'Practice with a Presidents quiz!', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user_id: User.find(tony))
wwii = Pack.create(name: 'WWII', description: 'Revew your WWII skills!', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user_id: User.find(sally))
ancient_rome = Pack.create(name: 'Ancient Rome', description: 'Test yourself on these Ancient Rome questions.', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user_id: User.find(tony))
prehistory = Pack.create(name: 'Prehistory', description: 'Practice with a Prehistory quiz!', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user_id: User.find(sally))
twentieth_century = Pack.create(name: 'Twentieth Century', description: 'Revew your Twentieth Century skills!', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user_id: User.find(tony))
black_holes = Pack.create(name: 'Black Holes', description: 'Test yourself on these Black Holes questions.', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user_id: User.find(tony))
quazars = Pack.create(name: 'Quazars', description: 'Practice with a Quazars quiz!', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user_id: User.find(tony))
planets = Pack.create(name: 'Planets', description: 'Revew your Planets skills!', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user_id: User.find(tony))
our_solar_system = Pack.create(name: 'Our Solar System', description: 'Test yourself on these Our Solar System questions.', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user_id: User.find(sally))
exogeology = Pack.create(name: 'Exogeology', description: 'Practice with a Exogeology quiz!', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user_id: User.find(tony))
asteroid_mining = Pack.create(name: 'Asteroid Mining', description: 'Revew your Asteroid Mining skills!', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user_id: User.find(tony))
astronomy_history = Pack.create(name: 'Astronomy History', description: 'Test yourself on these Astronomy History questions.', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user_id: User.find(sally))
supernovas = Pack.create(name: 'Supernovas', description: 'Practice with a Supernovas quiz!', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user_id: User.find(tony))

# cards

fun = Card.create(question: 'Is Ruby fun?', answer: 'Yes', is_multi: 'false', options: null, image_url: 'https://source.unsplash.com/600x400/?code', pack_id: Pack.find(ruby))
fun = Card.create(question: 'How fun is Ruby?', answer: 'like totes', is_multi: 'true', options: 'very|super very|like totes', image_url: 'https://source.unsplash.com/600x400/?code', pack_id: Pack.find(ruby))
fun = Card.create(question: 'What is the answer?', answer: 'Scaffold', is_multi: 'false', options: null, image_url: 'https://source.unsplash.com/600x400/?code', pack_id: Pack.find(ruby))

# views

View.create(result: 'right', user_id: User.find(tony), card_id: Card.find(fun))
View.create(result: 'presumed', user_id: User.find(tony), card_id: Card.find(how))
View.create(result: 'wrong', user_id: User.find(tony), card_id: Card.find(answer))
View.create(result: 'right', user_id: User.find(tony), card_id: Card.find(fun))
View.create(result: 'right', user_id: User.find(tony), card_id: Card.find(how))
View.create(result: 'right', user_id: User.find(tony), card_id: Card.find(answer))
View.create(result: 'right', user_id: User.find(tony), card_id: Card.find(fun))
View.create(result: 'right', user_id: User.find(tony), card_id: Card.find(how))
View.create(result: 'presumed', user_id: User.find(tony), card_id: Card.find(answer))
View.create(result: 'presumed', user_id: User.find(tony), card_id: Card.find(fun))
View.create(result: 'wrong', user_id: User.find(tony), card_id: Card.find(fun))
