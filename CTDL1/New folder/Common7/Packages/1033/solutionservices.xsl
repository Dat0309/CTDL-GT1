<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">
	<xsl:template match="/">
		<h1 _locID="L_string01_Text">Web Services in this Solution</h1>
		<p _locID="L_string02_Text">The Web services available in this solution are listed below.
            Click the service link to browse that service.</p>
		<table class="listpage" cellpadding="3" cellspacing="1" frame="void" bordercolor="#ffffff" rules="rows" width="100%" align="center">
    	    <xsl:choose>
				<xsl:when test="solutionDiscovery/solutionRef">
					<tr valign="center" align="left">
						<td class="header" width="125" _locID="L_string03_Text" nowrap="true">Services</td>
						<td class="header" width="125" _locID="L_string04_Text">Project</td>
                        <td class="header" _locID="L_string05_Text">URL</td>
					</tr>
					<xsl:for-each select="solutionDiscovery/solutionRef" order-by='@p2pref'>
						<tr valign="center" align="left">
							<td class="tbltext">
								<a _locID="L_string06_Text"><xsl:attribute name="href"><xsl:value-of select="@p2pref" /></xsl:attribute><xsl:value-of select="@name" /></a>
							</td>
							<td class="tbltext" nowrap="true">
								<xsl:value-of select="@project" />
							</td>
							<td class="tbltext" nowrap="true">
								<xsl:value-of select="@relref" />
							</td>
						</tr>
					</xsl:for-each>
				</xsl:when>
				<xsl:otherwise>
					<tr>
						<td class="tbltext" colspan="2" _locID="L_string07_Text">None - No Web services were found in the current solution.</td>
					</tr>
				</xsl:otherwise>
			</xsl:choose>
		</table>
	</xsl:template>
</xsl:stylesheet>
