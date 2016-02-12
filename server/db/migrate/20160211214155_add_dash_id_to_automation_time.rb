class AddDashIdToAutomationTime < ActiveRecord::Migration
  def change
    add_column :automation_times, :dash_id, :integer
  end
end
