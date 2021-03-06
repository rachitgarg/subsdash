require 'test_helper'

class SubscriptionTest < ActiveSupport::TestCase
  test "oid should be unique" do
    subscription = subscriptions(:one)
    new_subscription = Subscription.new oid: subscription.oid
    assert !new_subscription.save
    assert_includes new_subscription.errors.details[:oid], { error: :taken, value: subscription.oid }
  end
end

# == Schema Information
#
# Table name: subscriptions
#
#  id          :bigint(8)        not null, primary key
#  active      :boolean
#  oid         :string
#  quantity    :integer
#  started_at  :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  customer_id :bigint(8)
#  plan_id     :bigint(8)
#
# Indexes
#
#  index_subscriptions_on_customer_id  (customer_id)
#  index_subscriptions_on_oid          (oid)
#  index_subscriptions_on_plan_id      (plan_id)
#
# Foreign Keys
#
#  fk_rails_...  (customer_id => customers.id)
#  fk_rails_...  (plan_id => plans.id)
#
