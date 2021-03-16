		$("#menu-toggle").click(function(e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
    		
		});
		
		/*var inlineDefault = new kendo.data.HierarchicalDataSource({
			data: [
				{ text: "그리드원", items: [
					{ text: "AutomateOne", items: [
						{ text: "Trainer" },
						{ text: "Occasional Furniture" }
					]
							
					},
					{ text: "Sofas" },
					{ text: "Occasional FurnitureFFFFFFFFFFFFFFFFFFF" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]},
				{ text: "Decor", items: [
					{ text: "Bed Linen" },
					{ text: "Curtains & Blinds" },
					{ text: "Carpets" }
				]}
			]
		});
		
		
		$("#treeview").kendoTreeView({
			dataSource: inlineDefault
		});*/
		
		var flatData = [
  { id: 1, parent: 0, text: "Item 1" },
  { id: 2, parent: 0, text: "Item 2" },
  { id: 3, parent: 0, text: "Item 3" },
  { id: 4, parent: 0, text: "Item 4" },
  { id: 5, parent: 1, text: "Item 1.1" },
  { id: 6, parent: 1, text: "Item 1.2" },
  { id: 7, parent: 1, text: "Item 1.3" },
  { id: 8, parent: 3, text: "Item 3.1" },
  { id: 9, parent: 3, text: "Item 3.2" },
  { id: 10, parent: 5, text: "Item 1.1.1" },
  { id: 11, parent: 5, text: "Item 1.1.2" },
  { id: 12, parent: 5, text: "Item 1.1.3" }
];

function processTable(data, idField, foreignKey, rootLevel) {
  var hash = {};

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var id = item[idField];
    var parentId = item[foreignKey];

    hash[id] = hash[id] || [];
    hash[parentId] = hash[parentId] || [];

    item.items = hash[id];
    hash[parentId].push(item);
  }

  return hash[rootLevel];
}

// The tree for visualizing data.
$("#treeview").kendoTreeView({
  dataSource: processTable(flatData, "id", "parent", 0),
  loadOnDemand: false
});
