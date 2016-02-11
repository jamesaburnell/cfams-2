class User < ActiveRecord::Base
# Added by Koudoku.
  has_one :subscription


	after_initialize :set_default_role, :if => :new_record?
	enum role: [:user, :admin, :silver, :gold, :platinum]

	def set_default_role
	    self.role ||= :user
	end

  include DeviseTokenAuth::Concerns::User
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :dashes

end
