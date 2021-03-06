import ActionCable from 'actioncable'
import Events from './events'

var cable = ActionCable.createConsumer()

var channels = {
  plans (vm) {
    cable.subscriptions.create({ channel: 'PlansChannel' }, {
      received (data) {
        var plan = data.plan
        if (data.action === 'create') {
          Events.$emit('plan:created', plan)
          vm.$notify({
            group: 'foo',
            title: 'Plan added!',
            type: 'success',
            text: `Plan with oid: ${plan.oid} and name: ${plan.name} added.`
          })
        } else if (data.action === 'update') {
          Events.$emit('plan:updated', plan)
          vm.$notify({
            group: 'foo',
            title: 'Plan updated!',
            type: 'success',
            text: `Plan with oid: ${plan.oid} has been updated.`
          })
        }
      }
    })
  }, // plans (vm)
  customers (vm) {
    cable.subscriptions.create({ channel: 'CustomersChannel' }, {
      received (data) {
        var customer = data.customer
        if (data.action === 'create') {
          Events.$emit('customer:created', customer)
          vm.$notify({
            group: 'foo',
            title: 'Customer added!',
            type: 'success',
            text: `Customer with oid: ${customer.oid} and name: ${customer.name} added.`
          })
        } else if (data.action === 'update') {
          Events.$emit('customer:updated', customer)
          vm.$notify({
            group: 'foo',
            title: 'Customer updated!',
            type: 'success',
            text: `Customer with oid: ${customer.oid} has been updated.`
          })
        }
      }
    })
  }, // customers (vm)
}

export default channels
