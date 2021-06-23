using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace $rootnamespace$.$subnamespace$
{
    /// <summary>
    /// $loc_Entity1ServiceSummary1$
    /// $loc_Entity1ServiceSummary2$
    /// </summary>
    public class Entity1Service
    {
        /// <summary>
        /// $loc_Entity1ServiceReadItemSummary$
        /// $loc_Entity1ServiceFunctionSummary$
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Entity1</returns>
        public static Entity1 ReadItem(string id)
        {
            //$loc_Entity1ServiceFunctionTodoComment$
            Entity1 entity1 = new Entity1();
            entity1.Identifier1 = id;
            entity1.Message = "Hello World";
            return entity1;
        }
        /// <summary>
        /// $loc_Entity1ServiceReadListSummary$
        /// $loc_Entity1ServiceFunctionSummary$
        /// </summary>
        /// <returns>$loc_Entity1ServiceReadListReturns$</returns>
        public static IEnumerable<Entity1> ReadList()
        {
            //$loc_Entity1ServiceFunctionTodoComment$
            Entity1[] entityList = new Entity1[1];
            Entity1 entity1 = new Entity1();
            entity1.Identifier1 = "0";
            entity1.Message = "Hello World";
            entityList[0] = entity1;
            return entityList;
        }
    }
}
