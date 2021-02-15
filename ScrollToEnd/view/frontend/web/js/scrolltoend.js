/*
* @category  Theme
* @package   Bestresponse
* @author    Best Response Media Developers <dev@bestresponsemedia.co.uk>
* @copyright 2018 Best Response Media (http://bestresponsemedia.co.uk/)
* @license   Best Response Media Licence http://bestresponsemedia.co.uk/license/
* @link      http://bestresponsemedia.co.uk/
* ┌─┐┌─┐┌─┐┌┬┐ ┬─┐┌─┐┌─┐┌─┐┌─┐┌┐┬┌─┐┌─┐ ┌┐┌┐┌─┐┌─┐┬┌─┐
* │─│├┤ └─┐ │  ├┬┘├┤ └─┐├─┘│ ││││└─┐├┤  ││││├┤ │ │││─│
* └─┘└─┘└─┘ ┴  ┴└─└─┘└─┘┴  └─┘┴└┘└─┘└─┘ ┴└┘┴└─┘└─┘┴┴ ┴
*/

define([
    "jquery",
    'mage/translate'
], function($, $t) {
    "use strict";

    return {
        loadingIcon:'',
        isLoading: false,
        isEnd: false,
        page:1,
        firstToolbarCountNumber:1,
        loadNextPage:function() {

            var self = this;
            if(self.isEnd === true){
                return false;
            }
            if(self.isLoading === true){
                return false;
            }

            self.page++;
            this.loadMoreProducts();

        },
        setLoadingState:function() {
            if(this.isLoading === true){
                $("#loadmore #ste_status").show();
                $("#loadmore #ste_load_more").hide();
            } else {
                $("#loadmore #ste_status").hide();
            }
        },
        loadMoreProducts:function() {
            var self = this;

            var pageItem = jQuery('.toolbar .pages .pages-items').last().find('li.item.pages-item-next').first().find('a');

            if(pageItem.length==0){
                self.isEnd = true;
                $("#loadmore #ste_load_more").hide();
            }

            if(self.isEnd === true){
                return false;
            }
            if(self.isLoading === true){
                return false;
            }

            //Loading State On
            self.isLoading = true;
            $("#loadmore #ste_status").show();
            $("#loadmore #ste_load_more").hide();
            var reqUrl = pageItem.attr('href');
            $.ajax({
                url: reqUrl,
                async: true,
                data: {},
                type: 'GET',
                dataType: 'html',

                /**
                 * Response handler
                 * @param {Object} response
                 */
                success: function (response) {
                    var productList = $('.list.product-items');
                    var hasNextPage = $(response).find('.toolbar .pages .pages-items').last().find('li.item.pages-item-next').length;
                    var newProducts = $(response).find('.product-items > li.product-item:not(.nav-placeholder)');
                    newProducts.appendTo(productList);
                    var toolbarProducts = $(response).find('.toolbar-products').first();

                    if (toolbarProducts.length > 0) {
                        //$('.toolbar-products').first().replaceWith(toolbarProducts);
                        $('.toolbar-products').first().find('#toolbar-amount .toolbar-number').first().html(self.firstToolbarCountNumber);
                    }else{
                        $('.toolbar-products').html('');
                    }
                    var toolbarProducts = $(response).find('.toolbar-products').last();
                    if (toolbarProducts.length > 0) {
                        $('.toolbar-products').last().replaceWith(toolbarProducts);
                    }else{
                        $('.toolbar-products').html('');
                    }
                    $('.toolbar-products').last().hide();

                    $(window).trigger('loadmore');
                    $("body").trigger('contentUpdated');
                    $(".toolbar-products").trigger('contentUpdated');
                    $(document).trigger("mana-after-content-replaced");
                    if  ($(".image-mode .product").hasClass( "active" ) ){
                        $(".image-mode .product").trigger("click");
                    } else if  ($(".image-mode .model").hasClass( "active" )){
                        $(".image-mode .model").trigger("click");
                    }

                    //Loading State Off
                    self.isLoading = false;
                    $("#loadmore #ste_status").hide();
                    if(parseInt(self.page) >= 3){
                        $("#loadmore #ste_load_more").show();
                    }
                    self.setLoadingState();
                    window.history.replaceState({}, '',reqUrl);
                    if( parseInt(hasNextPage) === 0 ){

                        self.isEnd = true;
                        $("#loadmore #ste_load_more").hide();
                        $("#loadmore #ste_status").addClass("ended").html("End of Content");
                        $("#loadmore #ste_status").show();

                    }

                }
            });
        },
        init:function() {
            var self = this;
            self.page = 1;
            self.isLoading = false;
            self.isEnd = false;
            self.firstToolbarCountNumber = $('.toolbar-products').first().find('#toolbar-amount .toolbar-number').html();
            $(".toolbar").last().hide();
            $("#loadmore #ste_load_more").remove();

            var toolbar = $(".toolbar-products").last();
            toolbar.next('#loadmore').remove()
            toolbar.after("<div id='loadmore' class='loadmore'><a href='#' class='load-more-products' id='ste_status'><img style='width: 20px' src='" + this.loadingIcon + "' id='ste_status' /></a><a href='#' class='action primary'><span class='load-more-products' id='ste_load_more'>View More</span></a></div>");
            $("#loadmore #ste_status").hide();
            $("#loadmore #ste_load_more").hide();

            $("#loadmore #ste_load_more").click(function(e){
                e.preventDefault();
                self.loadNextPage();
            });
            $("#loadmore #ste_load_more").addClass('handled');
            $(window).bind("load", function() {
                var loading=$t('Loading More');
                var loadMore=$t('View More');
                $("#ste_status.load-more-products").html(loading);
                $("#ste_load_more.load-more-products").html(loadMore);
            });
            $('#ste_status.load-more-products').click(function(e) {
                e.preventDefault();
            });
            var hasNextPage = $('.toolbar .pages .pages-items').last().find('li.item.pages-item-next').length;
            if(parseInt(hasNextPage)===0){
                //No Next Page
                return false;
            }

            $(window).scroll(function (event) {
                var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

                if(scrollBottom <= ($('.page-footer').outerHeight()+$('.after-content').outerHeight())){
                    if(self.isEnd === true){
                        return false;
                    }

                    if(self.isLoading === false){
                        if(parseInt(self.page) >= 4){
                            $("#loadmore #ste_load_more").show();
                        } else {
                            $("#loadmore #ste_load_more").hide();
                            self.loadNextPage();
                        }

                        //$("#loadmore #ste_load_more").show();

                    }
                }

            });

        }
    };
});

