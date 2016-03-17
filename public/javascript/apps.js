$(document).ready(function() {


  var loader = $("#loader");
  var table = $("#table");
  var tableBody = $("#table > tbody");
  var errorDiv = $("#error")

  function refresh() {

    $.getJSON('/api/apps')
      .done(handleResponse)
      .fail(function(err) {
        if (err && err.status == 500) {
          loader.hide();
          errorDiv.html(err.statusText);
          errorDiv.removeClass('hidden');
        } else {
          // Most likely needs to relogin
          document.location.pathname = '/login';
        }
      })

    function handleResponse(res) {
      if (res.error) {
        return displayError(res.error)
      }

      return displayApps(res)
    }

    function displayError(err) {
      loader.hide();
    }

    function displayApps(apps) {

      Object.keys(apps).forEach(function(appName) {
        var rules = apps[appName]
        var row = renderTableRow(appName, rules);
        tableBody.append(row)
      });

      loader.hide();
      table.removeClass('hidden')
    }

    function renderTableRow(app, rules) {
      var appCell = '<td>' + app + '</td>';

      var rulesCell = '<td>';

      if (rules.length > 0) {

        var rulesCellContent = rules.map(function(rule, index) {

          var link = "https://manage.auth0.com/#/rules/" + rule.id
          var anchor = '<a href="' + link + '">' + rule.name + '</a>'
          if (index) {
            anchor = '<br />' + anchor;
          }
          return anchor;

        });

        rulesCell += rulesCellContent;
      } else {
        rulesCell += 'No rules currently applied to this app';
      }

      rulesCell += '</td>';

      return '<tr>' + appCell + rulesCell + '</tr>';
    }
  }

  $('#refresh').on('click', function() {
    errorDiv.addClass('hidden');
    table.addClass('hidden');
    loader.show();
    tableBody.html('');
    refresh();
  });

  refresh();

})
