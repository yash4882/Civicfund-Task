class Project < ApplicationRecord
  has_many :allocations
  has_many :users, through: :allocations
end
