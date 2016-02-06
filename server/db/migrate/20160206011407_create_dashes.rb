class CreateDashes < ActiveRecord::Migration
  def change
    create_table :dashes do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
