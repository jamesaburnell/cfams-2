# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160211214155) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "automation_times", force: :cascade do |t|
    t.time     "start_time"
    t.string   "task"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "dash_id"
  end

  create_table "coupons", force: :cascade do |t|
    t.string   "code"
    t.string   "free_trial_length"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "dashes", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "subreddit"
    t.string   "twit_consumer_key"
    t.string   "twit_consumer_secret"
    t.string   "twit_access_token"
    t.string   "twit_access_token_secret"
    t.integer  "user_id"
    t.string   "giphy_search"
    t.string   "twitter_pic_search"
    t.string   "tumblr_pic_search"
    t.string   "tumblr_consumer_key"
    t.string   "tumblr_consumer_secret"
    t.string   "tumblr_oauth_token"
    t.string   "tumblr_oauth_token_secret"
    t.string   "fb_token"
    t.string   "fb_app_id"
    t.string   "fb_app_secret"
    t.string   "fb_oauth_access_token"
  end

  create_table "plans", force: :cascade do |t|
    t.string   "name"
    t.string   "stripe_id"
    t.float    "price"
    t.string   "interval"
    t.text     "features"
    t.boolean  "highlight"
    t.integer  "display_order"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.string   "og_source"
    t.string   "body"
    t.string   "image_src"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.integer  "dash_id"
    t.boolean  "approved"
    t.string   "author"
    t.integer  "twit_published",         default: 0
    t.integer  "fb_published",           default: 0
    t.integer  "tumblr_published",       default: 0
    t.string   "usr_image_file_name"
    t.string   "usr_image_content_type"
    t.integer  "usr_image_file_size"
    t.datetime "usr_image_updated_at"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.string   "stripe_id"
    t.integer  "plan_id"
    t.string   "last_four"
    t.integer  "coupon_id"
    t.string   "card_type"
    t.float    "current_price"
    t.integer  "user_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "terms", force: :cascade do |t|
    t.string   "body"
    t.integer  "count"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "dash_id"
    t.integer  "favorite_count", default: 0
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "role"
    t.string   "mobile_number"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

end
