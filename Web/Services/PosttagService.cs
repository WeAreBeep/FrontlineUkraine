using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Web.Infrastructure;

namespace Web.Services
{
    public class PosttagSearchResponse
    {
        public class DataResponse
        {
            [JsonProperty("idx")]
            public string Idx { get; set; }
            public string Organisation { get; set; }

            [JsonProperty("Sub Building")]
            public string SubBuilding { get; set; }
            public string Number { get; set; }
            public string Building { get; set; }
            public string Street { get; set; }
            public string Locality { get; set; }
            public string Area { get; set; }
            public string Town { get; set; }
        }

        public string StatusCode { get; set; }
        public string Status { get; set; }

        [JsonProperty("msg")]
        public string Message { get; set; }

        public IEnumerable<DataResponse> Data { get; set; }
    }

    public interface IPosttagService
    {
        Task<PosttagSearchResponse> SearchByPostCode(string postCode);
    }

    public class PosttagService : IPosttagService
    {
        private readonly HttpClient _httpCliennt;
        private readonly string _posttagApiKey;
        private readonly string _posttagId;

        public PosttagService(HttpClient http, IOptions<ServerConfig> serverConfig)
        {
            _httpCliennt = http;
            _posttagId = serverConfig.Value.PosttagId;
            _posttagApiKey = serverConfig.Value.PosttagApiKey;
            _httpCliennt.BaseAddress = new System.Uri(serverConfig.Value.PosttagEndpoint);
        }

        public async Task<PosttagSearchResponse> SearchByPostCode(string postCode)
        {
            var path = QueryHelpers.AddQueryString(
                "/GTP034.php",
                new Dictionary<string, string>
                { { "cmd", "postcodefull" },
                    { "key", _posttagApiKey },
                    { "id", _posttagId },
                    { "postcode", postCode },
                });
            var resp = await _httpCliennt.GetAsync(path);
            resp.EnsureSuccessStatusCode();
            // NOTE: Posttag return content without Content-Type: application/json header.
            var contentStream = await resp.Content.ReadAsStreamAsync();
            using (StreamReader sr = new StreamReader(contentStream))
            using (JsonReader reader = new JsonTextReader(sr))
            {
                JsonSerializer serializer = new JsonSerializer();
                return serializer.Deserialize<PosttagSearchResponse>(reader);
            }
        }
    }
}
