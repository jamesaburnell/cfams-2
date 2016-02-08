class AddTumblrPublishedToPost < ActiveRecord::Migration
  def change
    add_column :posts, :tumblr_published, :integer
  end
end
