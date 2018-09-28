<template>
  <div>
    <form class="form-sign">
      <h3 class="h3 mb-3 font-weight-normal">Form</h3>
      <div class="form-group">
        <label for="inputName">Name</label>
        <input type="text"
               class="form-control"
               id="inputName"
               aria-describedby="namelHelp"
               placeholder="Enter name"
               required
               autofocus
               v-model="foodtruck.name">
      </div>
        <div class="form-group">
          <label for="inputFoodtype">Foodtype</label>
          <input type="text"
               class="form-control"
               id="inputFoodtype"
               placeholder="Enter Foodtype"
               required
               v-model="foodtruck.foodtype">
      </div>
          <div class="form-group">
            <label for="inputAvgcost">Avgcost</label>
            <input type="text"
               class="form-control"
               id="inputAvgcost"
               placeholder="Enter Avgcost"
               required
               v-model.number="foodtruck.avgcost">
      </div>

            <label for="inputCoordinates">Coordinates</label>
            <div class="form-row">
              <div class="form-group col-md-6">
                <!-- <label for="inputCoordinatesLatitude">Latitude</label> -->
                <input type="text"
                 class="form-control"
                 id="inputCoordinatesLatitude"
                 placeholder="Enter Latitude"
                 required
                 v-model.number="foodtruck.geometry.coordinates.latitude">
        </div>
                <div class="form-group col-md-6">
                  <!-- <label for="inputCoordinatesLongitude">Longitude</label> -->
                  <input type="text"
                 class="form-control"
                 id="inputCoordinatesLongitude"
                 placeholder="Enter Longitude"
                 required
                 v-model.number="foodtruck.geometry.coordinates.longitude">
        </div>
                </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Foodtruck",
  props: {
    foodtruck: {
      type: Object
    }
  }
};
</script>

<style scoped>
</style>
