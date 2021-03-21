<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- button trigger modal -->
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
        建立新的商品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <th width="120">分类</th>
        <th class="text-start">产品名称</th>
        <th width="120">原价</th>
        <th width="120">售价</th>
        <th width="100">是否启用</th>
        <th width="120">编辑</th>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td class="text-start">{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price | currency }}</td>
          <td class="text-end">{{ item.price | currency }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">启用</span>
            <span v-else>未启用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm me-1"
              @click="openModal(false, item)"
            >
              编辑
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDelModal(item)"
            >
              删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :has_pre="pagination.has_pre"
      :has_next="pagination.has_next"
      :total_pages="pagination.total_pages"
      :current_page="pagination.current_page"
      @onChange="getProducts"
    />

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              @click="productModal.hide()"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img :src="tempProduct.imageUrl" class="img-fluid" alt="" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
              @click="productModal.hide()"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct()"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-dismiss="modal"
              aria-label="Close"
              @click="delProductModal.hide()"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
              @click="delProductModal.hide()"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Pagination from '@/components/Pagination';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      productModal: null,
      delProductModal: null,
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/admin/products?page=${page}`;

      this.isLoading = true;
      this.$http.get(api).then((response) => {
        const { products, pagination } = response.data;

        this.isLoading = false;
        this.products = products;
        this.pagination = pagination;
      });
    },
    updateProduct() {
      let api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/admin/product`;
      let httpMethod = 'post';

      if (!this.isNew) {
        api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
      }

      this.$http[httpMethod](api, { data: this.tempProduct }).then(
        (response) => {
          const { success, message } = response.data;
          if (success) {
            this.productModal.hide();
            this.getProducts();
          } else {
            this.$bus.$emit('message:push', `创建失败:${message}`, 'danger');
          }
        }
      );
    },
    deleteProduct() {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/admin/product/${this.tempProduct.id}`;

      this.$http.delete(api).then((response) => {
        const { success, message } = response.data;
        if (success) {
          this.delProductModal.hide();
          this.getProducts();
        } else {
          this.$bus.$emit('message:push', `创建失败:${message}`, 'danger');
        }
      });
    },
    uploadFile() {
      const api = `${this.API_ENDPOINT}/api/${this.API_CUSTOM_PATH}/admin/upload`;
      const file = this.$refs.files.files[0];
      const formData = new FormData();

      formData.append('file-to-upload', file);

      this.status.fileUploading = true;
      this.$http
        .post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          const { success, imageUrl, message } = response.data;
          if (success) {
            // this.tempProduct.imageUrl = imageUrl;
            this.$set(this.tempProduct, 'imageUrl', imageUrl);
            this.$refs.files.value = null;
          } else {
            this.$bus.$emit('message:push', `上传失败:${message}`, 'danger');
          }

          this.status.fileUploading = false;
        });
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      this.tempProduct = isNew ? {} : { ...item }; //这里不能直接赋值，因为对象在栈内存中存的是同一份堆内存地址
      this.productModal.show();
    },
    openDelModal(item) {
      this.tempProduct = item;
      this.delProductModal.show();
    },
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.productModal = new Modal(document.getElementById('productModal'), {
      keyboard: false,
    });

    this.delProductModal = new Modal(
      document.getElementById('delProductModal'),
      {
        keyboard: false,
      }
    );
  },
  components: {
    Pagination,
  },
};
</script>
