<template>
  <div>
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div class="position-sticky pt-3">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理员</span>
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
              is="router-link"
              to="/admin/products"
            >
              <i data-feather="package"></i>
              产品列表
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" is="router-link" to="/admin/orders">
              <span data-feather="list"></span>
              订单列表
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" is="router-link" to="/admin/coupons">
              <span data-feather="credit-card"></span>
              优惠券
            </a>
          </li>
        </ul>

        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>模拟功能</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <a class="nav-link" href="#" is="router-link" to="/ordermock">
              <span data-feather="shopping-cart"></span>
              模拟订单
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>
