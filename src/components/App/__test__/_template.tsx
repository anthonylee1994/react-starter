// import { actions } from "../actions";
// import { SortOrder } from "../interfaces";
// import reducer from "../reducer";

// describe("CRUDTable", () => {
//   it("INITIALIZE_CRUD", () => {
//     expect(reducer({}, actions("customer").initialize({
//       name: "customer",
//       attributes: [
//         {
//           name: "id",
//           tableColumn: {
//             isDefaultColumn: false,
//           },
//         },
//         {
//           name: "address",
//           tableColumn: {
//             isDefaultColumn: true,
//           },
//         },
//         {
//           name: "customerName", // null tableColumn
//         },
//       ],
//     }))).toEqual({
//       customer: {
//         searchField: {
//           value: "",
//         },
//         rowSelection: {
//           selectedRowKeys: [],
//         },
//         formModal: {
//           type: "",
//           value: {},
//           visible: true,
//         },
//         columns: {
//           id: {
//             showColumn: false,
//             sortOrder: SortOrder.None,
//           },
//           address: {
//             showColumn: true,
//             sortOrder: SortOrder.None,
//           },
//           customerName: {
//             showColumn: true,
//             sortOrder: SortOrder.None,
//           },
//         },
//         pagination: {
//           currentPage: 1,
//           pageSize: 10,
//         },
//         settingsMenu: {
//           visible: false,
//           showMore: false,
//         },
//       },
//     });
//   });
//   it("CHNAGE_SELECTED_ROW_KEYS", () => {
//     expect(reducer({
//       debitNote: {
//         keepOther: "",
//         rowSelection: {
//           selectedRowKeys: [],
//         },
//       },
//     }, actions("debitNote").changeSelectedRowKeys([1, 2, 3]))).toEqual({
//       debitNote: {
//         keepOther: "",
//         rowSelection: {
//           selectedRowKeys: [1, 2, 3],
//         },
//       },
//     });
//   });
//   it("should replace the searchField value", () => {
//     expect(reducer({
//       debitNote: {
//         keepOther: "",
//         searchField: {
//           value: "",
//         },
//       },
//     }, actions("debitNote").changeQuickSearchValue("hi"))).toEqual({
//       debitNote: {
//         keepOther: "",
//         searchField: {
//           value: "hi",
//         },
//       },
//     });
//   });
//   it("CHANGE_CURRNET_PAGE_NUMBER", () => {
//     expect(reducer({
//       debitNote: {
//         keepOther: "",
//         pagination: {
//           currentPage: 1,
//           pageSize: 10,
//         },
//       },
//     }, actions("debitNote").changeCurrentPageNumber(2))).toEqual({
//       debitNote: {
//         keepOther: "",
//         pagination: {
//           currentPage: 2,
//           pageSize: 10,
//         },
//       },
//     });
//   });
//   it("CHANGE_PAGE_SIZE", () => {
//     expect(reducer({
//       debitNote: {
//         keepOther: "",
//         pagination: {
//           currentPage: 1,
//           pageSize: 10,
//         },
//       },
//     }, actions("debitNote").changePageSize(50))).toEqual({
//       debitNote: {
//         keepOther: "",
//         pagination: {
//           currentPage: 1,
//           pageSize: 50,
//         },
//       },
//     });
//   });

//   it("CHANGE_SETTINGS_MENU_VISIBLE", () => {
//     expect(reducer({
//       debitNote: {
//         keepOther: "",
//         settingsMenu: {
//           showMore: false,
//           visible: false,
//         },
//       },
//     }, actions("debitNote").changeSettingsMenuVisible(true))).toEqual({
//       debitNote: {
//         keepOther: "",
//         settingsMenu: {
//           showMore: false,
//           visible: true,
//         },
//       },
//     });
//   });

//   it("TOGGLE_SETTINGS_MENU_SHOW_MORE", () => {
//     expect(reducer({
//       debitNote: {
//         keepOther: "",
//         settingsMenu: {
//           showMore: false,
//           visible: false,
//         },
//       },
//     }, actions("debitNote").toggleSettingsMenuShowMore())).toEqual({
//       debitNote: {
//         keepOther: "",
//         settingsMenu: {
//           showMore: true,
//           visible: false,
//         },
//       },
//     });
//   });

//   it("CHANGE_SHOW_COLUMN", () => {
//     expect(reducer({
//       debitNote: {
//         keepOther: "",
//         columns: {
//           id: {
//             showColumn: false,
//             sortOrder: SortOrder.None,
//           },
//           name: {
//             showColumn: false,
//             sortOrder: SortOrder.None,
//           },
//         },
//       },
//     }, actions("debitNote").changeShowColumn("id", true))).toEqual({
//       debitNote: {
//         keepOther: "",
//         columns: {
//           id: {
//             showColumn: true,
//             sortOrder: SortOrder.None,
//           },
//           name: {
//             showColumn: false,
//             sortOrder: SortOrder.None,
//           },
//         },
//       },
//     });
//   });

//   it("TOGGLE_COLUMN_SORT_ORDER", () => {
//     expect(reducer({
//       debitNote: {
//         keepOther: "",
//         columns: {
//           id: {
//             showColumn: false,
//             sortOrder: SortOrder.Desc,
//           },
//           name: {
//             showColumn: false,
//             sortOrder: SortOrder.None,
//           },
//         },
//       },
//     }, actions("debitNote").toggleColumnSortOrder("id"))).toEqual({
//       debitNote: {
//         keepOther: "",
//         columns: {
//           id: {
//             showColumn: false,
//             sortOrder: SortOrder.None,
//           },
//           name: {
//             showColumn: false,
//             sortOrder: SortOrder.None,
//           },
//         },
//       },
//     });
//     expect(reducer({
//       debitNote: {
//         keepOther: "",
//         columns: {
//           id: {
//             showColumn: false,
//             sortOrder: SortOrder.None,
//           },
//           name: {
//             showColumn: false,
//             sortOrder: SortOrder.None,
//           },
//         },
//       },
//     }, actions("debitNote").toggleColumnSortOrder("id"))).toEqual({
//       debitNote: {
//         keepOther: "",
//         columns: {
//           id: {
//             showColumn: false,
//             sortOrder: SortOrder.Asc,
//           },
//           name: {
//             showColumn: false,
//             sortOrder: SortOrder.None,
//           },
//         },
//       },
//     });
//   });

//   it("CHANGE_MODAL_VISIBLE", () => {
//     expect(reducer({
//       debitNote: {
//         keepOther: "",
//         formModal: {
//           type: "",
//           value: {},
//           visible: false,
//         },
//       },
//     }, actions("debitNote").changeModalVisible(true, "EDIT", { id: 1 }))).toEqual({
//       debitNote: {
//         keepOther: "",
//         formModal: {
//           type: "EDIT",
//           value: { id: 1 },
//           visible: true,
//         },
//       },
//     });
//   });

// });
