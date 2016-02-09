# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u = User.new(email: "hathbanger.ah@gmail.com", password: "amh05055", password_confirmation: "amh05055")
u.save

d = Dash.new(title: "Cats are Assholes", subreddit: "catsareassholes", twit_consumer_key: ENV[twit_consumer_secret], twit_consumer_secret: )