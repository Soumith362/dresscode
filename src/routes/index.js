const InventoryController = require('../controllers/inventory_controller')
const BulkuploadController = require('../controllers/bulkupload_controller')
const EComController = require('../controllers/e-com_controller')
const UserController = require('../controllers/user_controller')
const OrderController = require('../controllers/order_controller')
const PaymentController = require('../controllers/payment_controller')
const DashboardController = require('../controllers/dashboard_controller')
const ImgToURLConverter = require('../controllers/imgToUrlConverter_controller')

class IndexRoute {
  constructor(expressApp) {
    this.app = expressApp
  }

  async initialize() {
    this.app.use('/inventory', InventoryController)
    this.app.use('/bulkUpload', BulkuploadController)
    this.app.use('/e-com', EComController)
    this.app.use('/user', UserController)
    this.app.use('/order', OrderController)
    this.app.use('/payment', PaymentController)
    this.app.use('/dashboard', DashboardController)
    this.app.use('/image', ImgToURLConverter)
  }
}

module.exports = IndexRoute;
