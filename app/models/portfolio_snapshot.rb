# == Schema Information
#
# Table name: portfolio_snapshots
#
#  id           :integer          not null, primary key
#  portfolio_id :integer          not null
#  date         :string           not null
#  value        :decimal(, )      not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class PortfolioSnapshot < ApplicationRecord

  validates :portfolio_id, :date, :value, presence: true
  
  belongs_to :portfolio,
    class_name: 'Portfolio',
    primary_key: :id,
    foreign_key: :portfolio_id

end
