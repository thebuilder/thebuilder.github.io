//shows login overlay
function showLogin() {
	console.log("Show Login");
}

//Add item to wish list related to bundle (product id). Remember to use size sepecific item numbers. Call multiple times when adding an entire bundle!
function addToWishList(itemNumber, productId) {
	console.log("Add to wishlist: " + productId + " - " + itemNumber);
}

//Called when an entire bundle is added, or if a single product is added from the singleitem-selector.
function addedToWishList(productId, arrayOfItemNumbers) {
	console.log("Added: " + productId + " items: " + arrayOfItemNumbers);
	addResult();
}


/*
    Returns the content of wish list snapshot.
    <snapshot>
        <item productId="" itemnumber="" />
        <item productId="" itemnumber="" />
    </snapshot>
*/
function getWishListSnapshot() {
}

//Remove item from wish list related to bundle (product id). Remember to use size sepecific item numbers. Call multiple times when removing an entire bundle!
function removeFromWishList(productId, itemNumber) {
	console.log("Remove from wishlist: " + productId + " - " + itemNumber);
}

//Initiate share flow
function showShareWishlist() {
	console.log("Show Wishlist");
}

//Navigate to full collection
function showFullCollection() {
	console.log("Show Full Collection");
}

//Add an item to the basket. Remember to use size specific item numbers.
function addToBasket(productId, itemNumber) { 
	console.log("Add to basket:"  + productId + " - " + itemNumber);
}

function NetminersPostFlashEvent(tags) {
	console.log("Track: " + tags);
}