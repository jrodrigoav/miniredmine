using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace MiniRedmine.Web.Services
{
    public abstract class BaseHttpClientService
    {
        protected readonly HttpClient _httpClient;

        public BaseHttpClientService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        protected void SerializeJsonIntoStream(object value, Stream stream)
        {
            using (var sw = new StreamWriter(stream, new UTF8Encoding(false), 1024, true))
            using (var jtw = new Newtonsoft.Json.JsonTextWriter(sw) { Formatting = Newtonsoft.Json.Formatting.None })
            {
                var js = new Newtonsoft.Json.JsonSerializer();
                js.Serialize(jtw, value);
                jtw.Flush();
            }
        }

        protected HttpContent CreateJsonHttpContent(object content)
        {
            HttpContent httpContent = null;

            if (content != null)
            {
                var ms = new MemoryStream();
                SerializeJsonIntoStream(content, ms);
                ms.Seek(0, SeekOrigin.Begin);
                httpContent = new StreamContent(ms);
                httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            }

            return httpContent;
        }
    }
}
