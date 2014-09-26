"use strict";angular.module("ngBonita",["ngResource","ngCookies"]),angular.module("ngBonita").config(["bonitaConfigProvider",function(a){a.setBonitaUrl("http://localhost:8080/bonita")}]),angular.module("ngBonita").factory("bonitaAuthentication",["$log","$http","$q","BonitaSession","bonitaConfig",function(a,b,c,d,e){var f={};return f.login=function(f,g){var h=c.defer();return b({method:"POST",url:e.getBonitaUrl()+"/loginservice",data:$.param({username:f,password:g,redirect:!1}),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(){a.log("BonitaAuthentication.login success"),d.getCurrent().$promise.then(function(a){null===a?h.reject("No active session found"):(e.setUsername(a.user_name),e.setUserId(a.user_id),h.resolve(a))})}).error(function(b,c,d,f){a.log("BonitaAuthentication.login failure response "+c),a.log("Bonita URL: "+e.getBonitaUrl()),h.reject({data:b,status:c,headers:d,config:f})}),h.promise},f.logout=function(){var d=c.defer();return b({method:"GET",url:e.getBonitaUrl()+"/logoutservice",data:$.param({redirect:!1}),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(){a.log("BonitaAuthentication.logout success"),e.setUsername(null),e.setUserId(null),d.resolve()}).error(function(b,c,e,f){a.log("BonitaAuthentication.logout failure response "+c),d.reject({data:b,status:c,headers:e,config:f})}),d.promise},f}]),angular.module("ngBonita").provider("bonitaConfig",function(){var a="http://localhost:8080/bonita",b={p:0,c:10};this.setBonitaUrl=function(b){a=b},this.overrideDefaultPagerValues=function(a){angular.extend(b,a)},this.$get=["$cookies",function(c){var d,e,f={};return c.bonitaUrl=a,f.getBonitaUrl=function(){return a},f.getUserId=function(){return d},f.setUserId=function(a){d=a,c.bonitaUserId=a},f.getUsername=function(){return e},f.setUsername=function(a){e=a,c.bonitaUsername=a},f.getDefaultPager=function(){return b},f}]}),angular.module("ngBonita").factory("bonitaUtils",["$http",function(a){var b={},c=function(a,b){var c=b()["content-range"],d=c.split("/"),e=d[0].split("-");return{items:angular.fromJson(a),pageIndex:Number(e[0]),pageSize:Number(e[1]),totalCount:Number(d[1])}};return b.transformPaginateresponse=function(){return[c].concat(a.defaults.transformResponse)},b}]),angular.module("ngBonita").factory("ArchivedHumanTask",["$resource","bonitaConfig","bonitaUtils",function(a,b,c){var d=angular.extend({id:"@id",o:"reached_state_date ASC"},b.getDefaultPager());return a(b.getBonitaUrl()+"/API/bpm/archivedHumanTask/:id",d,{getCompletedByCurrentUser:{method:"GET",params:{f:["assigned_id="+b.getUserId()]},transformResponse:c.transformPaginateresponse()}})}]),angular.module("ngBonita").factory("ArchivedProcessInstance",["$resource","bonitaConfig","bonitaUtils",function(a,b,c){var d=angular.extend({id:"@id"},b.getDefaultPager());return a(b.getBonitaUrl()+"/API/bpm/archivedCase/:id",d,{getStartedByCurrentUser:{method:"GET",params:{f:["started_by="+b.getUserId()]},transformResponse:c.transformPaginateresponse()}})}]),angular.module("ngBonita").factory("BonitaSession",["$resource","bonitaConfig",function(a,b){return a(b.getBonitaUrl()+"/API/system/session/unused",{},{getCurrent:{method:"GET"}})}]),angular.module("ngBonita").factory("HumanTask",["$resource","bonitaConfig","bonitaUtils",function(a,b,c){var d=angular.extend({id:"@id",o:"priority ASC"},b.getDefaultPager());return a(b.getBonitaUrl()+"/API/bpm/humanTask/:id",d,{getFromCurrentUser:{method:"GET",params:{f:["state=ready","user_id="+b.getUserId()]},transformResponse:c.transformPaginateresponse()}})}]),angular.module("ngBonita").factory("ProcessDefinition",["$resource","bonitaConfig","bonitaUtils",function(a,b,c){var d=angular.extend({id:"@id",o:"displayName ASC"},b.getDefaultPager());return a(b.getBonitaUrl()+"/API/bpm/process/:id",d,{getStartableByCurrentUser:{method:"GET",params:{f:["user_id="+b.getUserId()]},transformResponse:c.transformPaginateresponse()}})}]),angular.module("ngBonita").factory("ProcessInstance",["$resource","bonitaConfig","bonitaUtils",function(a,b,c){var d=angular.extend({id:"@id"},b.getDefaultPager());return a(b.getBonitaUrl()+"/API/bpm/case/:id",d,{getStartedByCurrentUser:{method:"GET",params:{f:["started_by="+b.getUserId()]},transformResponse:c.transformPaginateresponse()}})}]),angular.module("ngBonita").factory("User",["$resource","bonitaConfig",function(a,b){return a(b.getBonitaUrl()+"/API/identity/user/:id",{id:"@id"})}]);