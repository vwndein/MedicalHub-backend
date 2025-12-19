// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.changeColumn("Users", "image", {
//         type: Sequelize.BLOB("long"),
//         allowNull: true,
//       }),
//     ]);
//   },

//   down: (queryInterface, Sequelize) => {
//     return Promise.all([
//       queryInterface.changeColumn("Users", "image", {
//         type: Sequelize.STRING,
//         allowNull: true,
//       }),
//     ]);
//   },
// };

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Đầu tiên, xóa cột image cũ nếu tồn tại
    await queryInterface.removeColumn("Users", "image");

    // Sau đó, thêm cột image mới với kiểu BYTEA (PostgreSQL)
    await queryInterface.addColumn("Users", "image", {
      type: Sequelize.BLOB,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Để rollback, xóa cột image và thêm lại với kiểu STRING
    await queryInterface.removeColumn("Users", "image");
    await queryInterface.addColumn("Users", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
