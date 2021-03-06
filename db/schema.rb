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

ActiveRecord::Schema.define(version: 20180720171214) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "conditional_antecedent_disjunctions", force: :cascade do |t|
    t.integer  "disjunction_id", null: false
    t.integer  "conditional_id", null: false
    t.boolean  "truth_value",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "conditional_antecedents", force: :cascade do |t|
    t.integer  "antecedent_id",  null: false
    t.integer  "conditional_id", null: false
    t.boolean  "truth_value",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "conditional_consequent_disjunctions", force: :cascade do |t|
    t.integer  "disjunction_id", null: false
    t.integer  "conditional_id", null: false
    t.boolean  "truth_value",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "conditional_consequents", force: :cascade do |t|
    t.boolean  "truth_value",    null: false
    t.integer  "consequent_id",  null: false
    t.integer  "conditional_id", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "conditionals", force: :cascade do |t|
    t.boolean  "truth_value", default: true, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "disjunctions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "disjuncts", force: :cascade do |t|
    t.integer  "disjunct_id",    null: false
    t.integer  "disjunction_id", null: false
    t.boolean  "truth_value",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "propositions", force: :cascade do |t|
    t.string   "statement",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
