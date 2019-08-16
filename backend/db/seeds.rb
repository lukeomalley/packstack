# frozen_string_literal: true

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

ruby = Pack.create(name: 'Ruby', description: 'Revew your Ruby skills!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user: User.find(tony.id))
javascript = Pack.create(name: 'Javascript', description: 'Test yourself on these Javascript questions.', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user: User.find(sally.id))
rails = Pack.create(name: 'Rails', description: 'Practice with a Rails quiz!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user: User.find(bob.id))
scaffold = Pack.create(name: 'Scaffold', description: 'Revew your Scaffold skills!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user: User.find(sally.id))
gems = Pack.create(name: 'Gems', description: 'Test yourself on these Gems questions.', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user: User.find(bob.id))
pair_programming = Pack.create(name: 'Pair-Programming', description: 'Practice with a Pair-Programming quiz!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user: User.find(sally.id))
generators = Pack.create(name: 'Generators', description: 'Revew your Generators skills!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user: User.find(bob.id))
apis = Pack.create(name: 'APIs', description: 'Test yourself on these APIs questions.', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user: User.find(sally.id))
python = Pack.create(name: 'Python', description: 'Practice with a Python quiz!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user: User.find(sally.id))
sql = Pack.create(name: 'SQL', description: 'Revew your SQL skills!', image_url: 'https://source.unsplash.com/600x400/?code', category: 'Code', user: User.find(sally.id))
ancient_greece = Pack.create(name: 'Ancient Greece', description: 'Test yourself on these Ancient Greece questions.', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user: User.find(sally.id))
presidents = Pack.create(name: 'Presidents', description: 'Practice with a Presidents quiz!', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user: User.find(tony.id))
wwii = Pack.create(name: 'WWII', description: 'Revew your WWII skills!', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user: User.find(sally.id))
ancient_rome = Pack.create(name: 'Ancient Rome', description: 'Test yourself on these Ancient Rome questions.', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user: User.find(tony.id))
prehistory = Pack.create(name: 'Prehistory', description: 'Practice with a Prehistory quiz!', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user: User.find(sally.id))
twentieth_century = Pack.create(name: 'Twentieth Century', description: 'Revew your Twentieth Century skills!', image_url: 'https://source.unsplash.com/600x400/?history', category: 'History', user: User.find(tony.id))
black_holes = Pack.create(name: 'Black Holes', description: 'Test yourself on these Black Holes questions.', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user: User.find(tony.id))
quazars = Pack.create(name: 'Quazars', description: 'Practice with a Quazars quiz!', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user: User.find(tony.id))
planets = Pack.create(name: 'Planets', description: 'Revew your Planets skills!', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user: User.find(tony.id))
our_solar_system = Pack.create(name: 'Our Solar System', description: 'Test yourself on these Our Solar System questions.', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user: User.find(sally.id))
exogeology = Pack.create(name: 'Exogeology', description: 'Practice with a Exogeology quiz!', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user: User.find(tony.id))
asteroid_mining = Pack.create(name: 'Asteroid Mining', description: 'Revew your Asteroid Mining skills!', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user: User.find(tony.id))
astronomy_history = Pack.create(name: 'Astronomy History', description: 'Test yourself on these Astronomy History questions.', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user: User.find(sally.id))
supernovas = Pack.create(name: 'Supernovas', description: 'Practice with a Supernovas quiz!', image_url: 'https://source.unsplash.com/600x400/?space', category: 'Astronomy', user: User.find(tony.id))

# cards

fun = Card.create(question: 'Is Ruby fun?', answer: 'Yes', is_multi: false, image_url: 'https://source.unsplash.com/600x400/?code', pack: Pack.find(ruby.id))
how = Card.create(question: 'How fun is Ruby?', answer: 'like totes', is_multi: true, options: 'very|super very|like totes', image_url: 'https://source.unsplash.com/600x400/?code', pack: Pack.find(ruby.id))
answer = Card.create(question: 'What is the answer?', answer: 'Scaffold', is_multi: false, image_url: 'https://source.unsplash.com/600x400/?code', pack_id: Pack.find(ruby.id))

# views

View.create(result: 'right', user: User.find_by(id: tony.id), card: Card.find_by(id: fun.id))
View.create(result: 'presumed', user: User.find_by(id: tony.id), card: Card.find_by(id: how.id))
View.create(result: 'wrong', user: User.find_by(id: tony.id), card: Card.find_by(id: answer.id))
View.create(result: 'right', user: User.find_by(id: tony.id), card: Card.find_by(id: fun.id))
View.create(result: 'right', user: User.find_by(id: tony.id), card: Card.find_by(id: how.id))
View.create(result: 'right', user: User.find_by(id: tony.id), card: Card.find_by(id: answer.id))
View.create(result: 'right', user: User.find_by(id: tony.id), card: Card.find_by(id: fun.id))
View.create(result: 'right', user: User.find_by(id: tony.id), card: Card.find_by(id: how.id))
View.create(result: 'presumed', user: User.find_by(id: tony.id), card: Card.find_by(id: answer.id))
View.create(result: 'presumed', user: User.find_by(id: tony.id), card: Card.find_by(id: fun.id))
View.create(result: 'wrong', user: User.find_by(id: tony.id), card: Card.find_by(id: fun.id))
