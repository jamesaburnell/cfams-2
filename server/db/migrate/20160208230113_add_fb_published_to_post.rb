class AddFbPublishedToPost < ActiveRecord::Migration
  def change
    add_column :posts, :fb_published, :integer, default: 0
  end
end
