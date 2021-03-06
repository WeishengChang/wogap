Ember.TEMPLATES["application"] = Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 3,
            "column": 2
          },
          "end": {
            "line": 3,
            "column": 119
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        dom.setAttribute(el1,"class","easyui-linkbutton");
        dom.setAttribute(el1,"data-options","iconCls:'icon-edit',iconAlign:'top'");
        var el2 = dom.createTextNode("登出");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 4,
            "column": 2
          },
          "end": {
            "line": 4,
            "column": 122
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        dom.setAttribute(el1,"class","easyui-linkbutton");
        dom.setAttribute(el1,"data-options","iconCls:'icon-man',iconAlign:'top'");
        var el2 = dom.createTextNode("管理");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child2 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 5,
            "column": 2
          },
          "end": {
            "line": 5,
            "column": 125
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        dom.setAttribute(el1,"class","easyui-linkbutton");
        dom.setAttribute(el1,"data-options","iconCls:'icon-large-chart',iconAlign:'top'");
        var el2 = dom.createTextNode("統計");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "revision": "Ember@2.0.0+3296a952",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 17,
          "column": 48
        }
      }
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","easyui-layout");
      dom.setAttribute(el1,"data-options","fit:true");
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"data-options","region:'north'");
      dom.setAttribute(el2,"style","height:52px");
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"id","submenu");
      dom.setAttribute(el2,"data-options","region:'west'");
      dom.setAttribute(el2,"style","width:200px");
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"id","tabs");
      dom.setAttribute(el2,"data-options","region:'center'");
      dom.setAttribute(el2,"class","easyui-tabs");
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"title","首頁");
      var el4 = dom.createTextNode("\n			你好~~\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"id","tabOutlet");
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(element0, [1]);
      var morphs = new Array(5);
      morphs[0] = dom.createMorphAt(element1,1,1);
      morphs[1] = dom.createMorphAt(element1,3,3);
      morphs[2] = dom.createMorphAt(element1,5,5);
      morphs[3] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
      morphs[4] = dom.createMorphAt(dom.childAt(fragment, [2]),0,0);
      return morphs;
    },
    statements: [
      ["block","link-to",["logout"],[],0,null,["loc",[null,[3,2],[3,131]]]],
      ["block","link-to",["management"],[],1,null,["loc",[null,[4,2],[4,134]]]],
      ["block","link-to",["stats"],[],2,null,["loc",[null,[5,2],[5,137]]]],
      ["inline","outlet",["submenu"],[],["loc",[null,[8,2],[8,22]]]],
      ["inline","outlet",["tabOutlet"],[],["loc",[null,[17,20],[17,42]]]]
    ],
    locals: [],
    templates: [child0, child1, child2]
  };
}()));

Ember.TEMPLATES["bars"] = Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 19,
            "column": 5
          },
          "end": {
            "line": 19,
            "column": 66
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("顯示圖表");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "revision": "Ember@2.0.0+3296a952",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 30,
          "column": 37
        }
      }
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"id","bar-menu");
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","panel");
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","panel-header");
      var el4 = dom.createTextNode("設定");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","panel-content");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","panel");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","panel-header small");
      var el6 = dom.createTextNode("欄位");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","panel-content");
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode(" ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("panel END");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("div");
      dom.setAttribute(el4,"class","tab-control");
      dom.setAttribute(el4,"data-role","tab-control");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("ul");
      dom.setAttribute(el5,"class","tabs");
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("li");
      dom.setAttribute(el6,"class","active");
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"href","#_p1");
      var el8 = dom.createTextNode("標準");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("li");
      var el7 = dom.createElement("a");
      dom.setAttribute(el7,"href","#_p2");
      var el8 = dom.createTextNode("級距");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","frames");
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","frame");
      dom.setAttribute(el6,"id","_p1");
      var el7 = dom.createTextNode("\n					");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n					");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n					");
      dom.appendChild(el5, el6);
      var el6 = dom.createElement("div");
      dom.setAttribute(el6,"class","frame");
      dom.setAttribute(el6,"id","_p2");
      var el7 = dom.createTextNode("\n					list\n					");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("button");
      var el8 = dom.createTextNode("顯示圖表");
      dom.appendChild(el7, el8);
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n					");
      dom.appendChild(el6, el7);
      dom.appendChild(el5, el6);
      var el6 = dom.createTextNode("\n				");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createComment("frames END");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("TabControl END");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"id","bar-result");
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0, 1, 3]);
      var morphs = new Array(3);
      morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]),1,1);
      morphs[1] = dom.createMorphAt(dom.childAt(element0, [5, 3, 1]),1,1);
      morphs[2] = dom.createMorphAt(dom.childAt(fragment, [2]),0,0);
      return morphs;
    },
    statements: [
      ["inline","Select",[],["viewName","select","content",["subexpr","@mut",[["get","field",["loc",[null,[8,39],[8,44]]]]],[],[]],"value",["subexpr","@mut",[["get","selectedField",["loc",[null,[8,51],[8,64]]]]],[],[]]],["loc",[null,[8,4],[8,66]]]],
      ["block","link-to",["bars.basics",["get","selectedField",["loc",[null,[19,30],[19,43]]]]],[],0,null,["loc",[null,[19,5],[19,78]]]],
      ["content","outlet",["loc",[null,[30,21],[30,31]]]]
    ],
    locals: [],
    templates: [child0]
  };
}()));

Ember.TEMPLATES["bars/basics"] = Ember.HTMLBars.template((function() {
  return {
    meta: {
      "revision": "Ember@2.0.0+3296a952",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 9,
          "column": 8
        }
      }
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("<div id=\"chart1\"></div>");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("table");
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("tr");
      var el3 = dom.createElement("td");
      var el4 = dom.createTextNode("樣本數");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("td");
      dom.setAttribute(el3,"align","left");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("tr");
      var el3 = dom.createElement("td");
      var el4 = dom.createTextNode("最小值");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("td");
      dom.setAttribute(el3,"align","left");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("tr");
      var el3 = dom.createElement("td");
      var el4 = dom.createTextNode("最大值");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("td");
      dom.setAttribute(el3,"align","left");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("tr");
      var el3 = dom.createElement("td");
      var el4 = dom.createTextNode("平均值");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("td");
      dom.setAttribute(el3,"align","left");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("tr");
      var el3 = dom.createElement("td");
      var el4 = dom.createTextNode("四分位數");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("td");
      dom.setAttribute(el3,"align","left");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode(" - ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode(" - ");
      dom.appendChild(el3, el4);
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [4]);
      var element1 = dom.childAt(element0, [9, 1]);
      var morphs = new Array(8);
      morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
      morphs[1] = dom.createMorphAt(dom.childAt(element0, [1, 1]),0,0);
      morphs[2] = dom.createMorphAt(dom.childAt(element0, [3, 1]),0,0);
      morphs[3] = dom.createMorphAt(dom.childAt(element0, [5, 1]),0,0);
      morphs[4] = dom.createMorphAt(dom.childAt(element0, [7, 1]),0,0);
      morphs[5] = dom.createMorphAt(element1,0,0);
      morphs[6] = dom.createMorphAt(element1,2,2);
      morphs[7] = dom.createMorphAt(element1,4,4);
      return morphs;
    },
    statements: [
      ["inline","chart-basic",[],["data",["subexpr","@mut",[["get","data",["loc",[null,[2,19],[2,23]]]]],[],[]],"chartModel",["subexpr","@mut",[["get","chartModel",["loc",[null,[2,35],[2,45]]]]],[],[]]],["loc",[null,[2,0],[2,47]]]],
      ["content","samples",["loc",[null,[4,33],[4,44]]]],
      ["content","min",["loc",[null,[5,33],[5,40]]]],
      ["content","max",["loc",[null,[6,33],[6,40]]]],
      ["content","mean",["loc",[null,[7,33],[7,41]]]],
      ["content","q1",["loc",[null,[8,34],[8,40]]]],
      ["content","q2",["loc",[null,[8,43],[8,49]]]],
      ["content","q3",["loc",[null,[8,52],[8,58]]]]
    ],
    locals: [],
    templates: []
  };
}()));

Ember.TEMPLATES["main"] = Ember.HTMLBars.template((function() {
  return {
    meta: {
      "revision": "Ember@2.0.0+3296a952",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 23
        }
      }
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createTextNode("WOG Administrator Panel");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes() { return []; },
    statements: [

    ],
    locals: [],
    templates: []
  };
}()));

Ember.TEMPLATES["management"] = Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 3,
            "column": 1
          },
          "end": {
            "line": 3,
            "column": 28
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("英雄");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 3,
            "column": 41
          },
          "end": {
            "line": 3,
            "column": 66
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("冠軍");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child2 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 5,
            "column": 1
          },
          "end": {
            "line": 5,
            "column": 27
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("職業");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child3 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 6,
            "column": 1
          },
          "end": {
            "line": 6,
            "column": 32
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("技能");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child4 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 7,
            "column": 1
          },
          "end": {
            "line": 7,
            "column": 25
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("怪物");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child5 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 10,
            "column": 1
          },
          "end": {
            "line": 10,
            "column": 30
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("道具列表");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "revision": "Ember@2.0.0+3296a952",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 17,
          "column": 6
        }
      }
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","easyui-accordion");
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"title","玩家");
      dom.setAttribute(el2,"data-options","iconCls:'icon-ok'");
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode(" ");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("br");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n\n	");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("br");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("：\n	");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("：");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("br");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"title","物品");
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      var el3 = dom.createComment("");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("br");
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"title","公會");
      var el3 = dom.createTextNode("\n	A\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"title","其他");
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(element0, [1]);
      var morphs = new Array(6);
      morphs[0] = dom.createMorphAt(element1,1,1);
      morphs[1] = dom.createMorphAt(element1,3,3);
      morphs[2] = dom.createMorphAt(element1,6,6);
      morphs[3] = dom.createMorphAt(element1,9,9);
      morphs[4] = dom.createMorphAt(element1,11,11);
      morphs[5] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
      return morphs;
    },
    statements: [
      ["block","link-to",["playerHero"],[],0,null,["loc",[null,[3,1],[3,40]]]],
      ["block","link-to",["playerCP"],[],1,null,["loc",[null,[3,41],[3,78]]]],
      ["block","link-to",["character"],[],2,null,["loc",[null,[5,1],[5,39]]]],
      ["block","link-to",["characterSkill"],[],3,null,["loc",[null,[6,1],[6,44]]]],
      ["block","link-to",["monster"],[],4,null,["loc",[null,[7,1],[7,37]]]],
      ["block","link-to",["item","all"],[],5,null,["loc",[null,[10,1],[10,42]]]]
    ],
    locals: [],
    templates: [child0, child1, child2, child3, child4, child5]
  };
}()));

Ember.TEMPLATES["player"] = Ember.HTMLBars.template((function() {
  return {
    meta: {
      "revision": "Ember@2.0.0+3296a952",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 0
        }
      }
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      return el0;
    },
    buildRenderNodes: function buildRenderNodes() { return []; },
    statements: [

    ],
    locals: [],
    templates: []
  };
}()));

Ember.TEMPLATES["stats"] = Ember.HTMLBars.template((function() {
  var child0 = (function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@2.0.0+3296a952",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 19
            },
            "end": {
              "line": 1,
              "column": 74
            }
          }
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1,"class","icon-bars fg-blue");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("數值分佈");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 92
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","fluent-button",[],[],0,null,["loc",[null,[1,19],[1,92]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 2,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 63
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("i");
        dom.setAttribute(el1,"class","icon-accessibility fg-red");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("活耀程度");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child2 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 3,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 56
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("i");
        dom.setAttribute(el1,"class","icon-box fg-yellow");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("道具持有");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "revision": "Ember@2.0.0+3296a952",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 3,
          "column": 74
        }
      }
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var morphs = new Array(3);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
      morphs[2] = dom.createMorphAt(fragment,4,4,contextualElement);
      dom.insertBoundary(fragment, 0);
      dom.insertBoundary(fragment, null);
      return morphs;
    },
    statements: [
      ["block","link-to",["bars"],[],0,null,["loc",[null,[1,0],[1,104]]]],
      ["block","fluent-button",[],[],1,null,["loc",[null,[2,0],[2,81]]]],
      ["block","fluent-button",[],[],2,null,["loc",[null,[3,0],[3,74]]]]
    ],
    locals: [],
    templates: [child0, child1, child2]
  };
}()));

Ember.TEMPLATES["submenu"] = Ember.HTMLBars.template((function() {
  var child0 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 3,
            "column": 8
          },
          "end": {
            "line": 3,
            "column": 33
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("玩家管理");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 6,
            "column": 10
          },
          "end": {
            "line": 6,
            "column": 38
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("背包");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child2 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 9,
            "column": 10
          },
          "end": {
            "line": 9,
            "column": 43
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("裝備");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child3 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 12,
            "column": 10
          },
          "end": {
            "line": 12,
            "column": 39
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("倉庫");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child4 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 14,
            "column": 13
          },
          "end": {
            "line": 14,
            "column": 45
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("資源");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child5 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 15,
            "column": 13
          },
          "end": {
            "line": 15,
            "column": 44
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("職業熟練");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child6 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 16,
            "column": 13
          },
          "end": {
            "line": 16,
            "column": 44
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("已學技能");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child7 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 17,
            "column": 13
          },
          "end": {
            "line": 17,
            "column": 50
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("配置技能");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child8 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 18,
            "column": 13
          },
          "end": {
            "line": 18,
            "column": 44
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("任務");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child9 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 19,
            "column": 13
          },
          "end": {
            "line": 19,
            "column": 40
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("寵物");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child10 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 20,
            "column": 13
          },
          "end": {
            "line": 20,
            "column": 46
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("傭兵");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child11 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 21,
            "column": 13
          },
          "end": {
            "line": 21,
            "column": 41
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("增益");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child12 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 22,
            "column": 13
          },
          "end": {
            "line": 22,
            "column": 44
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("訊息");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child13 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 23,
            "column": 13
          },
          "end": {
            "line": 23,
            "column": 40
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("紀錄");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child14 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 24,
            "column": 13
          },
          "end": {
            "line": 24,
            "column": 41
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("信箱");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child15 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 25,
            "column": 13
          },
          "end": {
            "line": 25,
            "column": 43
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("好友");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child16 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 26,
            "column": 13
          },
          "end": {
            "line": 26,
            "column": 41
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("隊伍");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child17 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 27,
            "column": 13
          },
          "end": {
            "line": 27,
            "column": 46
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("入隊");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child18 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 31,
            "column": 8
          },
          "end": {
            "line": 31,
            "column": 31
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("物品管理");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child19 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 33,
            "column": 13
          },
          "end": {
            "line": 33,
            "column": 40
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("消耗品");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child20 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 34,
            "column": 13
          },
          "end": {
            "line": 34,
            "column": 40
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("魔石");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child21 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 35,
            "column": 13
          },
          "end": {
            "line": 35,
            "column": 40
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("精煉石");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child22 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 36,
            "column": 13
          },
          "end": {
            "line": 36,
            "column": 38
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("鑰匙");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child23 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 37,
            "column": 13
          },
          "end": {
            "line": 37,
            "column": 42
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("勳章換物");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child24 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 38,
            "column": 13
          },
          "end": {
            "line": 38,
            "column": 38
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("合成");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child25 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 39,
            "column": 13
          },
          "end": {
            "line": 39,
            "column": 39
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("拍賣");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child26 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 43,
            "column": 11
          },
          "end": {
            "line": 43,
            "column": 39
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("職業管理");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child27 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 45,
            "column": 13
          },
          "end": {
            "line": 45,
            "column": 45
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("技能");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child28 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 49,
            "column": 11
          },
          "end": {
            "line": 49,
            "column": 38
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("資源管理");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child29 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 51,
            "column": 13
          },
          "end": {
            "line": 51,
            "column": 44
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("市場紀錄");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child30 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 57,
            "column": 13
          },
          "end": {
            "line": 57,
            "column": 36
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("頭像");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  var child31 = (function() {
    return {
      meta: {
        "revision": "Ember@2.0.0+3296a952",
        "loc": {
          "source": null,
          "start": {
            "line": 58,
            "column": 13
          },
          "end": {
            "line": 58,
            "column": 37
          }
        }
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("怪物");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
  return {
    meta: {
      "revision": "Ember@2.0.0+3296a952",
      "loc": {
        "source": null,
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 61,
          "column": 5
        }
      }
    },
    arity: 0,
    cachedFragment: null,
    hasRendered: false,
    buildFragment: function buildFragment(dom) {
      var el0 = dom.createDocumentFragment();
      var el1 = dom.createElement("ul");
      dom.setAttribute(el1,"class","easyui-tree");
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("li");
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("span");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("ul");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createTextNode("\n				");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n			");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("li");
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("span");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("ul");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("li");
      var el3 = dom.createElement("span");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("ul");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("li");
      var el3 = dom.createElement("span");
      var el4 = dom.createComment("");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("ul");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n\n	");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("li");
      var el3 = dom.createElement("span");
      var el4 = dom.createTextNode("其他");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n		");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("ul");
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n			");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("li");
      var el5 = dom.createElement("span");
      var el6 = dom.createComment("");
      dom.appendChild(el5, el6);
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n		");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n	");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      return el0;
    },
    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
      var element0 = dom.childAt(fragment, [0]);
      var element1 = dom.childAt(element0, [1]);
      var element2 = dom.childAt(element1, [3]);
      var element3 = dom.childAt(element0, [3]);
      var element4 = dom.childAt(element3, [3]);
      var element5 = dom.childAt(element0, [5]);
      var element6 = dom.childAt(element0, [7]);
      var element7 = dom.childAt(element0, [9, 2]);
      var morphs = new Array(32);
      morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
      morphs[1] = dom.createMorphAt(dom.childAt(element2, [1, 1]),0,0);
      morphs[2] = dom.createMorphAt(dom.childAt(element2, [3, 1]),0,0);
      morphs[3] = dom.createMorphAt(dom.childAt(element2, [5, 1]),0,0);
      morphs[4] = dom.createMorphAt(dom.childAt(element2, [7, 0]),0,0);
      morphs[5] = dom.createMorphAt(dom.childAt(element2, [9, 0]),0,0);
      morphs[6] = dom.createMorphAt(dom.childAt(element2, [11, 0]),0,0);
      morphs[7] = dom.createMorphAt(dom.childAt(element2, [13, 0]),0,0);
      morphs[8] = dom.createMorphAt(dom.childAt(element2, [15, 0]),0,0);
      morphs[9] = dom.createMorphAt(dom.childAt(element2, [17, 0]),0,0);
      morphs[10] = dom.createMorphAt(dom.childAt(element2, [19, 0]),0,0);
      morphs[11] = dom.createMorphAt(dom.childAt(element2, [21, 0]),0,0);
      morphs[12] = dom.createMorphAt(dom.childAt(element2, [23, 0]),0,0);
      morphs[13] = dom.createMorphAt(dom.childAt(element2, [25, 0]),0,0);
      morphs[14] = dom.createMorphAt(dom.childAt(element2, [27, 0]),0,0);
      morphs[15] = dom.createMorphAt(dom.childAt(element2, [29, 0]),0,0);
      morphs[16] = dom.createMorphAt(dom.childAt(element2, [31, 0]),0,0);
      morphs[17] = dom.createMorphAt(dom.childAt(element2, [33, 0]),0,0);
      morphs[18] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
      morphs[19] = dom.createMorphAt(dom.childAt(element4, [1, 0]),0,0);
      morphs[20] = dom.createMorphAt(dom.childAt(element4, [3, 0]),0,0);
      morphs[21] = dom.createMorphAt(dom.childAt(element4, [5, 0]),0,0);
      morphs[22] = dom.createMorphAt(dom.childAt(element4, [7, 0]),0,0);
      morphs[23] = dom.createMorphAt(dom.childAt(element4, [9, 0]),0,0);
      morphs[24] = dom.createMorphAt(dom.childAt(element4, [11, 0]),0,0);
      morphs[25] = dom.createMorphAt(dom.childAt(element4, [13, 0]),0,0);
      morphs[26] = dom.createMorphAt(dom.childAt(element5, [0]),0,0);
      morphs[27] = dom.createMorphAt(dom.childAt(element5, [2, 1, 0]),0,0);
      morphs[28] = dom.createMorphAt(dom.childAt(element6, [0]),0,0);
      morphs[29] = dom.createMorphAt(dom.childAt(element6, [2, 1, 0]),0,0);
      morphs[30] = dom.createMorphAt(dom.childAt(element7, [1, 0]),0,0);
      morphs[31] = dom.createMorphAt(dom.childAt(element7, [3, 0]),0,0);
      return morphs;
    },
    statements: [
      ["block","link-to",["player"],[],0,null,["loc",[null,[3,8],[3,45]]]],
      ["block","link-to",["player.item"],[],1,null,["loc",[null,[6,10],[6,50]]]],
      ["block","link-to",["player.equipment"],[],2,null,["loc",[null,[9,10],[9,55]]]],
      ["block","link-to",["player.depot"],[],3,null,["loc",[null,[12,10],[12,51]]]],
      ["block","link-to",["player.exchange"],[],4,null,["loc",[null,[14,13],[14,57]]]],
      ["block","link-to",["player.chexp"],[],5,null,["loc",[null,[15,13],[15,56]]]],
      ["block","link-to",["player.skill"],[],6,null,["loc",[null,[16,13],[16,56]]]],
      ["block","link-to",["player.skill.setup"],[],7,null,["loc",[null,[17,13],[17,62]]]],
      ["block","link-to",["player.mission"],[],8,null,["loc",[null,[18,13],[18,56]]]],
      ["block","link-to",["player.pet"],[],9,null,["loc",[null,[19,13],[19,52]]]],
      ["block","link-to",["player.mercenary"],[],10,null,["loc",[null,[20,13],[20,58]]]],
      ["block","link-to",["player.buff"],[],11,null,["loc",[null,[21,13],[21,53]]]],
      ["block","link-to",["player.message"],[],12,null,["loc",[null,[22,13],[22,56]]]],
      ["block","link-to",["player.log"],[],13,null,["loc",[null,[23,13],[23,52]]]],
      ["block","link-to",["player.mail"],[],14,null,["loc",[null,[24,13],[24,53]]]],
      ["block","link-to",["player.friend"],[],15,null,["loc",[null,[25,13],[25,55]]]],
      ["block","link-to",["player.team"],[],16,null,["loc",[null,[26,13],[26,53]]]],
      ["block","link-to",["player.team.join"],[],17,null,["loc",[null,[27,13],[27,58]]]],
      ["block","link-to",["item"],[],18,null,["loc",[null,[31,8],[31,43]]]],
      ["block","link-to",["item.used"],[],19,null,["loc",[null,[33,13],[33,52]]]],
      ["block","link-to",["item.stone"],[],20,null,["loc",[null,[34,13],[34,52]]]],
      ["block","link-to",["item.plus"],[],21,null,["loc",[null,[35,13],[35,52]]]],
      ["block","link-to",["item.key"],[],22,null,["loc",[null,[36,13],[36,50]]]],
      ["block","link-to",["item.honor"],[],23,null,["loc",[null,[37,13],[37,54]]]],
      ["block","link-to",["item.syn"],[],24,null,["loc",[null,[38,13],[38,50]]]],
      ["block","link-to",["item.sale"],[],25,null,["loc",[null,[39,13],[39,51]]]],
      ["block","link-to",["character"],[],26,null,["loc",[null,[43,11],[43,51]]]],
      ["block","link-to",["character.skill"],[],27,null,["loc",[null,[45,13],[45,57]]]],
      ["block","link-to",["exchange"],[],28,null,["loc",[null,[49,11],[49,50]]]],
      ["block","link-to",["exchange.log"],[],29,null,["loc",[null,[51,13],[51,56]]]],
      ["block","link-to",["avatar"],[],30,null,["loc",[null,[57,13],[57,48]]]],
      ["block","link-to",["monster"],[],31,null,["loc",[null,[58,13],[58,49]]]]
    ],
    locals: [],
    templates: [child0, child1, child2, child3, child4, child5, child6, child7, child8, child9, child10, child11, child12, child13, child14, child15, child16, child17, child18, child19, child20, child21, child22, child23, child24, child25, child26, child27, child28, child29, child30, child31]
  };
}()));