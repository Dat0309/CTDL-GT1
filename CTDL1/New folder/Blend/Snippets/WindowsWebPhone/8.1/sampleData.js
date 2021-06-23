// Create sample data using a list
var sampleData = new WinJS.Binding.List([
	{name:'sampleONE', groupName:'group1'},
	{name:'sampleTWO', groupName:'group1'},
	{name:'sampleTHREE', groupName:'group2'},
	{name:'sampleFOUR', groupName:'group2'},
	{name:'sampleFIVE', groupName:'group2'}
]);

// Create the groups for the ListView from the item data and the grouping functions
var groupedList = sampleData.createGrouped(getGroupKey, getGroupData, compareGroups);

// Function used to sort the groups
// Note: This is similar to default sorting behavior
// when using WinJS.Binding.List.createGrouped()
function compareGroups(left, right) {
	return left.localeCompare(right);
}

// Function which returns the group key that an item belongs to
function getGroupKey(dataItem) {
	return dataItem.groupName;
}

// Function which returns the data for a group
function getGroupData(dataItem) {
	return {
		groupName: dataItem.groupName
	};
}

// This function returns a WinJS.Binding.List containing only the items
// that belong to the provided group.
function getItemsFromGroup(groupName) {
	return sampleData.createFiltered(function (item) { return item.groupName === groupName; });
}

// create data sources to use in the Hub Sections
var groupOneName = groupedList.groups.getAt(0).groupName;
var groupTwoName = groupedList.groups.getAt(1).groupName;
var sectionOneDataSource = getItemsFromGroup(groupOneName);
var sectionTwoDataSource = getItemsFromGroup(groupTwoName);
