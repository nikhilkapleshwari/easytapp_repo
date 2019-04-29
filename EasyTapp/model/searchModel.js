class SearchModel{

    constructor(userEmail,searchString,categoryValue,sortingType,minSeeders,isScheduledSearch){
        if (typeof userEmail === 'undefined') {
            userEmail='default@gmail.com';
          }
        this.userEmail=userEmail;
        this.searchString=searchString;
        if (typeof categoryValue === 'undefined') {
            categoryValue=0;
          }
        if (typeof sortingType === 'undefined') {
            sortingType='last';
          }
        if (typeof minSeeders === 'undefined') {
            minSeeders=3;
          }
          if (typeof isScheduledSearch === 'undefined') {
            isScheduledSearch=0;
          }
        this.categoryValue=categoryValue;
        this.sortingType=sortingType;
        this.minSeeders=minSeeders;
        this.isScheduledSearch=isScheduledSearch;
    }

    getgetSearchString(){
        return this.searchString;
    }

    
    getCategoryValue(){
        return this.categoryValue;
    }
}
module.exports = SearchModel;