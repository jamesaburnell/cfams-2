class CreateTerms < ActiveRecord::Migration
  def change
    create_table :terms do |t|
      t.string :body
      t.integer :count

      t.timestamps null: false
    end
  end
end
