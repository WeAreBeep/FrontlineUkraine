using System;
using System.Collections.Generic;
using Contentful.Core.Configuration;

namespace Web.Configuration.Contentful
{
    /// <summary>
    /// Resolves a strong type from a content type id. Instructing the serialization engine how to deserialize items in a collection.
    /// </summary>
    public class ContentfulModuleResolver : IContentTypeResolver
    {
        private Dictionary<string, Type> _types = new Dictionary<string, Type>()
        {
        };

        /// <summary>
        /// Method to get a type based on the specified content type id.
        /// </summary>
        /// <param name="contentTypeId">The content type id to resolve to a type.</param>
        /// <returns>The type for the content type id or null if none is found.</returns>
        public Type Resolve(string contentTypeId)
        {
            return _types.TryGetValue(contentTypeId, out var type) ? type : null;
        }
    }
}
