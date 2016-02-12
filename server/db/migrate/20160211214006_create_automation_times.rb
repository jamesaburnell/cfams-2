class CreateAutomationTimes < ActiveRecord::Migration
  def change
    create_table :automation_times do |t|
      t.time :start_time
      t.string :task

      t.timestamps null: false
    end
  end
end
