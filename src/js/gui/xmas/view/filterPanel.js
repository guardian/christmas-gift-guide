var gui = gui || {};
gui.xmas = gui.xmas || {};
gui.xmas.view = gui.xmas.view || {};

var filterLookup = {};

//setInterval(function(){alert("Hello")},3000);


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();




var $headerEl = $('.leftSideHolderSmall');
var yPosition =0;
var xPosition =0;

function render(){
	if($headerEl.length === 0) {
		$headerEl = $('.leftSideHolderSmall');
		return;
	}

	if(xPosition == 102){
		xPosition = 0;
	}
	if(yPosition == 118){
		yPosition = 0;
	}
	yPosition += 0.5;
	xPosition += 0.5;
	$headerEl.css('background-position', xPosition + 'px ' + yPosition + 'px');
}

function animloop(){
  requestAnimFrame(animloop);
  render();
};

animloop();




(function()
{
    gui.xmas.view.FilterPanel = function()
    {
		this.filterDivsArr = [];
	};
	gui.xmas.view.FilterPanel.prototype = {
		init: function(){			
			
			var smallOrNot = '';
			if (width < 9400) {
				smallOrNot = 'Small';
			}
			var leftSideHolder = jQ('.leftSideHolder' + smallOrNot);
			
			var leftsideFilterPanel = document.createElement('div');
			leftsideFilterPanel.className = 'filterPanelLeftSide';
			leftSideHolder.append(leftsideFilterPanel);

			
			
			var seperator = document.createElement('div');
			seperator.className = 'filterPanelSeperator';
			leftsideFilterPanel.appendChild(seperator);
			
			var categoriesAndFilters = gui.xmas.model.getCategoryGroupsAndTitles();
			
				var categoryHolder = document.createElement('div');
				categoryHolder.className = 'filterPanelCategoryHolder';
				leftsideFilterPanel.appendChild(categoryHolder);
				
				categoryHolder.style.cssFloat = 'left';
				
			var showWishlist = document.createElement('div');
				categoryHolder.appendChild(showWishlist);
				showWishlist.className = 'show-wishlist wishlist-hide';
				jQ(showWishlist).html("My TV guide<span id='wishlist-button-counter'>0</span>");
				
				jQ(showWishlist).click(function() {
					
					if (jQ('.wishListPanelTop').height() < 1) {
						
						jQ('.wishListPanelTop').css("max-height", "300px");
						
						//jQ(".wishListPanelTop").slideUp();
					}
					else
					{
						jQ('.wishListPanelTop').css("max-height", "0px");
					}
					
					//jQ(".wishListPanelTop").slideUp();
					
				});

			var filterHolder = document.createElement('div');
				filterHolder.className = 'filterHolder';
				categoryHolder.appendChild(filterHolder);
				
				
				
			/*
				
			jQ(window).scroll(function(e) {
        var newScroll = jQ(document).scrollTop();
        
        checkForFixed(newScroll);
        //console.log(newScroll);
    });
    
    function checkForFixed(scrollTop) {
		
		var offset = jQ(".filterPanelCategoryHolder").offset();
		
		if (scrollTop > offset.top) {
			
			jQ(".filterPanelCategoryHolder").css("position", "fixed");
		}
		else
		{
			jQ(".filterPanelCategoryHolder").css("position", "static");
		}
		
	}
	*/

				
			var a;
			for (a = 0; a < categoriesAndFilters.length; a++) {
				
			
				
				//var categoryTitle = document.createElement('h2');
				//categoryTitle.innerHTML = categoriesAndFilters[a].title;
				//categoryHolder.appendChild(categoryTitle);
				
				//var categoryClear = document.createElement('div');
				//categoryClear.className = 'clearBoth';
				//leftsideFilterPanel.appendChild(categoryClear);
				/*
				var filterList = document.createElement('ul');
				leftsideFilterPanel.appendChild(filterList);
				
				var b, filtersLength = categoriesAndFilters[a].filters.length;
				for (b = 0; b < filtersLength; b++) {
					
					var gridLi = document.createElement('li');
					filterList.appendChild(gridLi);
					
					var filterBox = document.createElement('div');
					filterBox.className = 'filterPanalFilterBox';
					filterBox.id = categoriesAndFilters[a].filters[b];
					gridLi.appendChild(filterBox);
					gui.xmas.view.filterPanel.filterDivsArr[gui.xmas.view.filterPanel.filterDivsArr.length] = filterBox;
					
					if (gui.xmas.model.screenVersion === 'iFrame') {
						jQ(filterBox).mouseover(function() {
							if (!gui.xmas.model.isFilterActive(this.id)) {
								TweenLite.killTweensOf(jQ(this));
								jQ(this).css('backgroundColor', '#7d4430');
								TweenLite.to(jQ(this), 1, {css:{backgroundColor:"#fb9107"}, ease:Power2.easeOut});
							}
						});

						jQ(filterBox).mouseout(function() {
							if (!gui.xmas.model.isFilterActive(this.id)) {
								TweenLite.killTweensOf(jQ(this));
								TweenLite.to(jQ(this), 1, {css:{backgroundColor:"#e7d7c0"}, ease:Power2.easeOut});
							}
						});
					}
					
					jQ(filterBox).click(function() {
						var filterWaiting = jQ('#filteringWait');
						filterWaiting.css('display', 'block');
						if (!gui.xmas.model.isFilterActive(this.id)) {
							gui.xmas.model.addFilter(this.id);

							jQ(this).css('backgroundColor', '#fb9107');
						}
						else {
							jQ(this).css('backgroundColor', '#e7d7c0');
							gui.xmas.model.removeFilter(this.id);
						}
						gui.xmas.view.productsGridView.scrollUpUpdate();
						filterWaiting.css('display', 'none');
					});
					
					var title = document.createElement('h1');
					title.innerHTML = categoriesAndFilters[a].filters[b];
					filterBox.appendChild(title);
					
				}
				*/
				
				var filterListContainer = document.createElement('div');
				filterHolder.appendChild(filterListContainer);
				filterListContainer.className = 'styled-select';
				
				var filterList = document.createElement('select');
				filterListContainer.appendChild(filterList);
				filterList.id = "filterList_" + a;
				
				var b, filtersLength = categoriesAndFilters[a].filters.length;
				for (b = 0; b < filtersLength; b++) {
					
					//var gridLi = document.createElement('li');
					//filterList.appendChild(gridLi);
					
					var filterBox = document.createElement('option');
					filterBox.className = 'filterPanalFilterBox';
					filterBox.id = categoriesAndFilters[a].filters[b];
					filterBox.value = categoriesAndFilters[a].filters[b];
					filterList.appendChild(filterBox);
					gui.xmas.view.filterPanel.filterDivsArr[gui.xmas.view.filterPanel.filterDivsArr.length] = filterBox;
					
					if (gui.xmas.model.screenVersion === 'iFrame') {
						jQ(filterBox).mouseover(function() {
							if (!gui.xmas.model.isFilterActive(this.value)) {
								//TweenLite.killTweensOf(jQ(this));
								//jQ(this).css('backgroundColor', '#7d4430');
								//TweenLite.to(jQ(this), 1, {css:{backgroundColor:"#fb9107"}, ease:Power2.easeOut});
							}
						});

						jQ(filterBox).mouseout(function() {
							if (!gui.xmas.model.isFilterActive(this.value)) {
								//TweenLite.killTweensOf(jQ(this));
								//TweenLite.to(jQ(this), 1, {css:{backgroundColor:"#e7d7c0"}, ease:Power2.easeOut});
							}
						});
					}
					
					
					
					var title = document.createElement('h1');
					title.innerHTML = categoriesAndFilters[a].filters[b];
					filterBox.appendChild(title);
					
				}
				
				

				jQ(filterList).change(function() {
						
						var value = jQ(this).val();
						
						
						//gui.xmas.model.removeSelectiveFilters(this.id);
						
						var listArr = jQ(this).attr("id").split("_");
						var listIndex = Number(listArr[1]);
						var filterWaiting = jQ('#filteringWait');
						filterWaiting.css('display', 'block');
						
						gui.xmas.model.removeSelectiveFilters(listIndex);
						
						
						if (value.substring(0, 3) != "Any") {
							
							
						
						if (!gui.xmas.model.isFilterActive(value)) {
							
							gui.xmas.model.addFilter(value);
							//jQ(this).css('backgroundColor', '#fb9107');
						}
						
						} else {
							
							//for (var i = 1; i < categoriesAndFilters[listIndex].filters.length; i++) {
								
								//if (!gui.xmas.model.isFilterActive(categoriesAndFilters[listIndex].filters[i])) {
							//gui.xmas.model.addFilter(categoriesAndFilters[listIndex].filters[i]);
							//jQ(this).css('backgroundColor', '#fb9107');
								//}
								
							//}
							
							
						}
						
						//console.log(gui.xmas.model.activeFiltersArr);
						//else {
							//jQ(this).css('backgroundColor', '#e7d7c0');
							//gui.xmas.model.removeFilter(this.id);
						//}
						gui.xmas.view.productsGridView.scrollUpUpdate();
						filterWaiting.css('display', 'none');
					});
				
				
				
				
				
				
			}
			var clearFilters = document.createElement('div');
				filterHolder.appendChild(clearFilters);
				clearFilters.className = 'clearBoth';
			/*
			var moreFilters = document.createElement('div');
			moreFilters.className = 'moreFiltersBox';
			leftsideFilterPanel.appendChild(moreFilters);
			
			var moreFiltersTitle = document.createElement('h1');
			moreFiltersTitle.innerHTML = 'More filters';
			moreFilters.appendChild(moreFiltersTitle);
			*/
			
			var clearDiv = document.createElement('div');
			clearDiv.className = 'clearBoth';
			leftsideFilterPanel.appendChild(clearDiv);


			
		}
		
	}

}());